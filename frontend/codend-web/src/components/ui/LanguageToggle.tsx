'use client';

import { usePathname } from 'next/navigation';

export default function LanguageToggle() {
  const pathname = usePathname();

  const isArabic = pathname.startsWith('/ar');
  const newPath = isArabic
    ? pathname.replace('/ar', '/en')
    : pathname.replace('/en', '/ar');

  return (
    <a
      href={newPath}
      className="text-sm font-medium hover:underline"
    >
      {isArabic ? 'English' : 'عربي'}
    </a>
  );
}
