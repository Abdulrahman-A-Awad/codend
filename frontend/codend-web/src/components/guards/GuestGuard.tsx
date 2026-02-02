'use client';

import { useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';

export default function GuestGuard({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const locale = pathname.split('/')[1];

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (token) {
      router.replace(`/${locale}/dashboard`);
    }
  }, [locale, router]);

  return <>{children}</>;
}
