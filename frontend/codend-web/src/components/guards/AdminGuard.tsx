'use client';

import { useAuth } from '@/context/AuthContext';
import { useRouter, usePathname } from 'next/navigation';
import { useEffect } from 'react';

export default function AdminGuard({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, loading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const locale = pathname.split('/')[1];

  useEffect(() => {
    if (!loading && (!user || !user.is_admin)) {
      router.replace(`/${locale}/dashboard`);
    }
  }, [user, loading, locale, router]);

  if (loading) return null;

  return <>{children}</>;
}
