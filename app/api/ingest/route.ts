import type { NextApiRequest, NextApiResponse, PageConfig } from 'next';
import { zValidateEnv } from '../../../utils';
import { PineconeClient } from '@pinecone-database/pinecone';
import { PineconeStore } from 'langchain/vectorstores/pinecone';

import { OpenAIEmbeddings } from 'langchain/embeddings/openai';
import { RecursiveCharacterTextSplitter } from 'langchain/text_splitter';
import { PDFLoader } from 'langchain/document_loaders/fs/pdf';
import { pineconeSchema } from '../../../schemas';
import path from 'path';
import { NextResponse } from 'next/server';

const {
  PINECONE_API_KEY,
  PINECONE_ENVIRONMENT,
  PINECONE_INDEX,
  PINECONE_NAME_SPACE,
} = zValidateEnv(pineconeSchema);

export async function POST(req: Request) {
  const pinecone = new PineconeClient();

  await pinecone.init({
    environment: PINECONE_ENVIRONMENT,
    apiKey: PINECONE_API_KEY,
  });

  /*load raw docs from the all files in the directory */
  // log current directory

  const filePath = path.resolve('./docs/cv.pdf');
  console.log(filePath);
  const loader = new PDFLoader(filePath, {
    splitPages: false,
  });

  const docs = await loader.load();

  /* Split text into chunks */
  const textSplitter = new RecursiveCharacterTextSplitter({
    chunkSize: 1000,
    chunkOverlap: 200,
  });

  console.log('creating vector store...');

  const embeddings = new OpenAIEmbeddings();
  const index = pinecone.Index(PINECONE_INDEX);

  //embed the PDF documents
  const vector = await PineconeStore.fromDocuments(docs, embeddings, {
    pineconeIndex: index,
    namespace: PINECONE_NAME_SPACE,
    textKey: 'text',
  });

  console.log('vector store created');

  return NextResponse.json({ vector });
}

// export const config: PageConfig = {
//   api: {
//     bodyParser: false,
//   },
// };
