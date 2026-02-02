'use client';

import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { me } from '@/lib/auth';

export default function DashboardPage() {
  const router = useRouter();
  const pathname = usePathname();
  const locale = pathname.split('/')[1];

  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (!token) {
      router.replace(`/${locale}/auth/login`);
      return;
    }

    me()
      .then((data) => {
        setUser(data);
      })
      .catch(() => {
        localStorage.removeItem('token');
        router.replace(`/${locale}/auth/login`);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [locale, router]);

  if (loading) {
    return <p className="p-6">Loading...</p>;
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">
        Dashboard
      </h1>

      <p className="mt-2">
        مرحبًا {user?.name}
      </p>
    </div>
  );
}
