import { z } from 'zod';

export const milvusSchema = z.object({
  MILVUS_URL: z.string(),
});
export const myScaleSchema = z.object({
  MYSCALE_HOST: z.string(),
  MYSCALE_PORT: z.string(),
  MYSCALE_USERNAME: z.string(),
  MYSCALE_PASSWORD: z.string(),
});
export const openSearchSchema = z.object({
  OPENSEARCH_URL: z.string(),
});
export const pineconeSchema = z.object({
  PINECONE_API_KEY: z.string(),
  PINECONE_ENVIRONMENT: z.string(),
  PINECONE_INDEX: z.string(),
  PINECONE_NAME_SPACE: z.string(),
});
export const qdrantSchema = z.object({
  QDRANT_URL: z.string(),
  QDRANT_API_KEY: z.string(),
});
export const redisSchema = z.object({
  REDIS_URL: z.string(),
});
export const singleStorageSchema = z.object({
  SINGLESTORE_HOST: z.string(),
  SINGLESTORE_PORT: z.number(),
  SINGLESTORE_USERNAME: z.string(),
  SINGLESTORE_PASSWORD: z.string(),
  SINGLESTORE_DATABASE: z.string(),
});

export const tigrisSchema = z.object({
  TIGRIS_PROJECT: z.string(),
  TIGRIS_CLIENT_ID: z.string(),
  TIGRIS_CLIENT_SECRET: z.string(),
});
export const weaviateSchema = z.object({
  WEAVIATE_SCHEME: z.string(),
  WEAVIATE_HOST: z.string(),
  WEAVIATE_API_KEY: z.string(),
});
export const supabaseSchema = z.object({
  SUPABASE_PRIVATE_KEY: z.string(),
  SUPABASE_URL: z.string(),
});
