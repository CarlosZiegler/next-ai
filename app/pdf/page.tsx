'use client';

import { useChat } from 'ai/react';

export default function Chat() {
  const { messages, input, handleInputChange, handleSubmit, isLoading } =
    useChat({
      api: '/api/chat-pdf',
    });

  return (
    <div>
      <h1 className="text-3xl font-bold text-center">Chat with PDF</h1>
      <a
        href="https://github.com/CarlosZiegler/next-ai/blob/main/docs/cv.pdf"
        target="_blank"
        rel="noopener noreferrer"
      >
        <h4 className="text-2xl font-bold text-center text-blue-600 no-underline hover:underline">
          Resume
        </h4>
      </a>

      <div className="flex justify-center h-5">
        {isLoading ? (
          <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-gray-900"></div>
        ) : (
          <span className="h-5 w-5" />
        )}
      </div>

      <div className="mx-auto w-full max-w-md py-24 flex flex-col stretch">
        {messages.length > 0
          ? messages.map((m) => (
              <div key={m.id} className="whitespace-pre-wrap">
                {m.role === 'user' ? 'User: ' : 'AI: '}
                {m.content}
              </div>
            ))
          : null}

        <form onSubmit={handleSubmit}>
          <input
            className="fixed w-full max-w-md bottom-0 border border-gray-300 rounded mb-8 shadow-xl p-2"
            value={input}
            placeholder="Say something..."
            onChange={handleInputChange}
          />
        </form>
      </div>
    </div>
  );
}
