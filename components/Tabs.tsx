'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';

const navLinks = [
  { href: '/', label: 'Root' },
  { href: '/pdf', label: 'Chat-PDF' },
  { href: '/functions', label: 'Functions' },
];

export const Tabs = () => {
  const pathname = usePathname();
  return (
    <div className="flex align-middle justify-center p-5">
      <ul
        className={`flex flex-wrap text-sm font-medium text-center ${pathname} text-gray-500 border-b border-gray-200 dark:border-gray-700 dark:text-gray-400`}
      >
        {navLinks.map(({ href, label }) => (
          <Link
            href={href}
            key={href}
            className={`inline-block p-4 rounded-t-lg hover:text-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800 dark:hover:text-gray-300 ${
              pathname === href
                ? 'text-gray-900 bg-gray-50 dark:bg-gray-900 dark:text-gray-300'
                : 'text-gray-500'
            }`}
          >
            {label}
          </Link>
        ))}
      </ul>
    </div>
  );
};
