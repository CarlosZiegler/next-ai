/* eslint-disable turbo/no-undeclared-env-vars */
import { StreamingTextResponse, OpenAIStream } from 'ai';

import { zValidateEnv } from '@/utils';
import { openAISchema } from '@/schemas';
import { Configuration, OpenAIApi } from 'openai';
import { NextResponse } from 'next/server';

interface Function {
  name: string;
  description: string;
  parameters: object;
}

const functionDescription: Function = {
  name: 'get_current_weather',
  description: 'Get the current weather in a given location',
  parameters: {
    type: 'object',
    properties: {
      location: {
        type: 'string',
        description: 'The city and state, e.g. San Francisco, CA',
      },
      unit: {
        type: 'string',
        enum: ['celsius', 'fahrenheit'],
      },
    },
    required: ['location'],
  },
};

const { OPENAI_API_KEY } = zValidateEnv(openAISchema);

const configuration = new Configuration({
  apiKey: OPENAI_API_KEY,
});

function get_current_weather(args: { location: string; unit: string }) {
  const weather_info = {
    location: args.location,
    temperature: '72',
    unit: args?.unit || 'fahrenheit',
    forecast: ['sunny', 'windy'],
  };
  return JSON.stringify(weather_info);
}

export async function POST(req: Request) {
  const { messages } = await req.json();

  const initialMessage = {
    role: 'user' as const,
    content: messages[messages.length - 1].content as string,
  };

  const model = new OpenAIApi(configuration);
  const response = await model.createChatCompletion({
    model: 'gpt-4-0613',
    messages: [initialMessage],
    functions: [functionDescription],
    function_call: 'auto',
  });

  const message = response?.data?.choices?.[0]?.message;

  if (message?.function_call && message.function_call.arguments) {
    const functionResponse = get_current_weather(
      JSON.parse(message.function_call.arguments)
    );

    const response = await model.createChatCompletion({
      model: 'gpt-4-0613',
      messages: [
        initialMessage,
        message,
        {
          role: 'function',
          name: message.function_call.name,
          content: functionResponse,
        },
      ],
    });

    const answer = response?.data?.choices[0].message;

    return NextResponse.json(answer?.content);
  }

  return NextResponse.json(message?.content);
}
