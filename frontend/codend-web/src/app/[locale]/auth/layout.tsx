'use client';

import { useTranslations } from 'next-intl';
import GuestGuard from '@/components/guards/GuestGuard';

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const t = useTranslations('authLayout');

  return (
    <GuestGuard>
      <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2">
        {/* Form */}
        <div className="flex items-center justify-center p-6">
          {children}
        </div>

        {/* Info */}
        <div className="hidden lg:flex items-center justify-center bg-gradient-to-br from-indigo-600 to-purple-700 text-white p-10">
          <div className="max-w-md text-center">
            <h1 className="text-4xl font-bold mb-4">
              {t('title')}
            </h1>
            <p className="opacity-90">
              {t('subtitle')}
            </p>
          </div>
        </div>
      </div>
    </GuestGuard>
  );
}
