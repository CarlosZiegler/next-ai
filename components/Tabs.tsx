import Link from 'next/link';

export const Tabs = () => (
  <div>
    <ul className="flex flex-wrap text-sm font-medium text-center text-gray-500 border-b border-gray-200 dark:border-gray-700 dark:text-gray-400">
      <li className="mr-2">
        <Link
          href="/"
          aria-current="page"
          className="inline-block p-4 rounded-t-lg hover:text-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800 dark:hover:text-gray-300"
        >
          Root
        </Link>
      </li>
      <li className="mr-2">
        <Link
          href="/pdf"
          className="inline-block p-4 rounded-t-lg hover:text-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800 dark:hover:text-gray-300"
        >
          CV-PDF
        </Link>
      </li>
      <li className="mr-2">
        <Link
          href="/functions"
          className="inline-block p-4 rounded-t-lg hover:text-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800 dark:hover:text-gray-300"
        >
          Functions
        </Link>
      </li>
    </ul>
  </div>
);
