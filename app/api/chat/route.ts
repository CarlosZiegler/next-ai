import { StreamingTextResponse, LangChainStream, Message } from 'ai';
import { CallbackManager } from 'langchain/callbacks';
import { ChatOpenAI } from 'langchain/chat_models/openai';
import { AIChatMessage, HumanChatMessage } from 'langchain/schema';

export const runtime = 'edge';

export async function POST(req: Request) {
  const { messages } = await req.json();

  const { stream, handlers } = LangChainStream();

  const llm = new ChatOpenAI({
    temperature: 0,
    modelName: 'gpt-3.5-turbo-0613',
    streaming: true,
    callbackManager: CallbackManager.fromHandlers(handlers),
  });

  llm
    .call(
      (messages as Message[]).map((m) =>
        m.role == 'user'
          ? new HumanChatMessage(m.content)
          : new AIChatMessage(m.content)
      )
    )
    .catch(console.error);

  return new StreamingTextResponse(stream);
}
