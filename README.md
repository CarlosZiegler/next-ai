# LangchainAI, Next.js, Typescript, Pinecone Vector DB, and OpenAI Functions Boilerplate

This repository provides a boilerplate for setting up a project using LangchainAI, Next.js, Typescript, Pinecone Vector DB, and OpenAI Functions. It is designed to help developers quickly bootstrap projects that leverage the power of AI and vector databases in a modern web development environment.

## Deploy Your Own

You can deploy this boilerplate using Vercel:

[Deploy with Vercel](https://vercel.com/new/git/external?repository-url=https%3A%2F%2Fgithub.com%2Fyour-repo%2Fnext-langchain-pinecone-openai)

## How to Use

To bootstrap the boilerplate, you can use `create-next-app` with npm, Yarn, or pnpm:

```bash
npx create-next-app --example https://github.com/your-repo/next-langchain-pinecone-openai my-app
# or
yarn create next-app --example https://github.com/your-repo/next-langchain-pinecone-openai my-app
# or
pnpm create next-app --example https://github.com/your-repo/next-langchain-pinecone-openai my-app
```

To run the boilerplate locally, you need to:

1. Sign up at OpenAI's Developer Platform.
2. Go to OpenAI's dashboard and create an API KEY.
3. Set the required OpenAI environment variable as the token value as shown in the example `.env` file but in a new file called `.env.local`.
4. Run `pnpm install` to install the required dependencies.
5. Run `pnpm dev` to launch the development server.

## Learn More

To learn more about LangchainAI, Next.js, Typescript, Pinecone Vector DB, and OpenAI Functions, take a look at the following resources:

- [LangChainAI Documentation](https://langchain.ai/docs) - Learn more about LangChainAI.
- [Next.js Documentation](https://nextjs.org/docs) - Learn about Next.js features and API.
- [Typescript Documentation](https://www.typescriptlang.org/docs/) - Learn about Typescript, a typed superset of JavaScript.
- [Pinecone Documentation](https://www.pinecone.io/docs/) - Learn about Pinecone, a vector database for machine learning.
- [OpenAI Documentation](https://platform.openai.com/docs/) - Learn about OpenAI features and API.
- [Vercel AI SDK Documentation](https://vercel.com/docs/ai) - Learn more about the Vercel AI SDK.

## Environment Variables

For this boilerplate to function correctly, you need to set up the following environment variables in your `.env.local` file:

```bash
OPENAI_API_KEY=xxxx
PINECONE_API_KEY=xxxx
PINECONE_ENVIRONMENT=xxxx
PINECONE_INDEX=xxxx
PINECONE_NAME_SPACE=xxxx
```

Replace `xxxx` with your actual keys and values. Here's a brief explanation of each variable:

- `OPENAI_API_KEY`: This is your OpenAI API key. You can obtain this key from the OpenAI's Developer Platform after signing up.
- `PINECONE_API_KEY`: This is your Pinecone API key. You can obtain this key from the Pinecone's Developer Platform after signing up.
- `PINECONE_ENVIRONMENT`: This is the environment variable for Pinecone. It's usually set to `us-westI apologize for the confusion. Here's the complete text inside a markdown code block:
