/* eslint-disable turbo/no-undeclared-env-vars */
import { StreamingTextResponse, LangChainStream, Message } from 'ai';
import { CallbackManager } from 'langchain/callbacks';
import { ChatOpenAI } from 'langchain/chat_models/openai';
import { PineconeClient } from '@pinecone-database/pinecone';
import { PineconeStore } from 'langchain/vectorstores/pinecone';
import { ConversationalRetrievalQAChain } from 'langchain/chains';
import { OpenAIEmbeddings } from 'langchain/embeddings/openai';
import { BufferMemory } from 'langchain/memory';
import { zValidateEnv } from '@/utils';
import { pineconeSchema } from '@/schemas';
import { templates } from '@/constants';

const {
  PINECONE_API_KEY,
  PINECONE_ENVIRONMENT,
  PINECONE_INDEX,
  PINECONE_NAME_SPACE,
} = zValidateEnv(pineconeSchema);

export async function POST(req: Request) {
  const { messages } = await req.json();
  const { stream, handlers } = LangChainStream();

  const pinecone = new PineconeClient();

  await pinecone.init({
    environment: PINECONE_ENVIRONMENT,
    apiKey: PINECONE_API_KEY,
  });

  const question = messages[messages.length - 1].content;
  const model = new ChatOpenAI({
    temperature: 0,
    modelName: 'gpt-4-0613',
    streaming: true,
    callbackManager: CallbackManager.fromHandlers(handlers),
  });

  const index = pinecone.Index(PINECONE_INDEX);

  const vectorStore = await PineconeStore.fromExistingIndex(
    new OpenAIEmbeddings({}),
    {
      pineconeIndex: index,
      textKey: 'text',
      namespace: PINECONE_NAME_SPACE,
    }
  );

  const nonStreamingModel = new ChatOpenAI();

  const chain = ConversationalRetrievalQAChain.fromLLM(
    model,
    vectorStore.asRetriever(),
    {
      returnSourceDocuments: true,
      memory: new BufferMemory({
        memoryKey: 'chat_history',
        inputKey: 'question',
        outputKey: 'text',
        returnMessages: true,
      }),
      // qaChainOptions: {
      //   prompt: new PromptTemplate({
      //     inputVariables: ['question', 'chat_history'],
      //     template: templates.qaPrompt,
      //   }),
      // },
      questionGeneratorChainOptions: {
        llm: nonStreamingModel,
        template: templates.qaPrompt,
      },
    }
  );

  chain
    .call({
      question,
      chat_history: messages?.map(
        (m: { role: string; content: string }) => m.content
      ),
    })
    .catch(console.error);

  return new StreamingTextResponse(stream);
}
