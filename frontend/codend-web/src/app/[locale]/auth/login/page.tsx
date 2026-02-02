'use client';

import { useTranslations } from 'next-intl';
import { useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import { login } from '@/lib/auth';

export default function LoginPage() {
  const t = useTranslations('auth');
  const router = useRouter();
  const pathname = usePathname();
  const locale = pathname.split('/')[1];

  const [loginValue, setLoginValue] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const data = await login(loginValue, password);
      localStorage.setItem('token', data.token);
      router.push(`/${locale}/dashboard`);
    } catch {
      setError(
        locale === 'ar'
          ? 'بيانات الدخول غير صحيحة'
          : 'Invalid login credentials'
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="w-full max-w-md space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold">{t('loginTitle')}</h2>
        <p className="text-sm text-muted-foreground">
          {t('loginSubtitle')}
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Login input */}
        <input
          type="text"
          placeholder={t('loginPlaceholder')}
          value={loginValue}
          onChange={(e) => setLoginValue(e.target.value)}
          className="w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-indigo-500"
          required
        />

        {/* Password input */}
        <div className="relative">
          <input
            type={showPassword ? 'text' : 'password'}
            placeholder={t('passwordPlaceholder')}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-3 pr-12 rounded-lg border focus:outline-none focus:ring-2 focus:ring-indigo-500"
            required
          />

          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute top-1/2 -translate-y-1/2 right-3 text-sm text-gray-500 hover:text-gray-700"
          >
            {showPassword ? '🙈' : '👁️'}
          </button>
        </div>

        {/* Error */}
        {error && (
          <p className="text-sm text-red-500 text-center">
            {error}
          </p>
        )}

        {/* Submit */}
        <button
          disabled={loading}
          className="w-full py-3 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 transition disabled:opacity-60"
        >
          {loading ? '...' : t('loginButton')}
        </button>
      </form>

      <p className="text-center text-sm">
        {t('noAccount')}{' '}
        <Link
          href={`/${locale}/auth/register`}
          className="text-indigo-600 hover:underline"
        >
          {t('register')}
        </Link>
      </p>
    </div>
  );
}
