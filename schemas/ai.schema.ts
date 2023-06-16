import { z } from 'zod';

export const openAISchema = z.object({
	OPENAI_API_KEY: z.string(),
});
export const azureOpenAISchema = z.object({
	AZURE_OPENAI_API_KEY: z.string(),
	AZURE_OPENAI_API_INSTANCE_NAME: z.string(),
	AZURE_OPENAI_API_DEPLOYMENT_NAME: z.string(),
	AZURE_OPENAI_API_VERSION: z.string(),
});
export const cohereAISchema = z.object({
	COHERE_API_KEY: z.string(),
});
export const anthropicAISchema = z.object({
	ANTHROPIC_API_KEY: z.string(),
});
export const googleVertexAISchema = z.object({
	GOOGLE_APPLICATION_CREDENTIALS: z.string(),
});
export const huggingFaceSchema = z.object({
	HUGGINGFACEHUB_API_KEY: z.string(),
});
