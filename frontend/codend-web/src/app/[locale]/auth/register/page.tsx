'use client';

import { useTranslations } from 'next-intl';
import { useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import { register } from '@/lib/auth';
import { useAuth } from '@/context/AuthContext';


export default function RegisterPage() {
  const t = useTranslations('register');
  const router = useRouter();
  const pathname = usePathname();
  const locale = pathname.split('/')[1];

  const [form, setForm] = useState({
    name: '',
    username: '',
    email: '',
    password: '',
    password_confirmation: '',
  });

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { refreshUser } = useAuth();

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

async function handleSubmit(e: React.FormEvent) {
  e.preventDefault();
  setLoading(true);
  setError('');

  try {
    const data = await register(form);
    localStorage.setItem('token', data.token);

    // 🔥 المهم
    await refreshUser();

    router.push(`/${locale}/dashboard`);
  } catch (err: any) {
    setError(
      err?.response?.data?.message ||
        (locale === 'ar'
          ? 'تحقق من البيانات المدخلة'
          : 'Please check your input')
    );
  } finally {
    setLoading(false);
  }
}

  return (
    <div className="w-full max-w-md space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold">{t('title')}</h2>
        <p className="text-sm text-muted-foreground">
          {t('subtitle')}
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input name="name" placeholder={t('name')} onChange={handleChange} className="w-full px-4 py-3 rounded-lg border" required />
        <input name="username" placeholder={t('username')} onChange={handleChange} className="w-full px-4 py-3 rounded-lg border" required />
        <input name="email" type="email" placeholder={t('email')} onChange={handleChange} className="w-full px-4 py-3 rounded-lg border" required />

        {/* Password */}
        <div className="relative">
          <input
            name="password"
            type={showPassword ? 'text' : 'password'}
            placeholder={t('password')}
            onChange={handleChange}
            className="w-full px-4 py-3 pr-12 rounded-lg border"
            required
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute top-1/2 -translate-y-1/2 right-3 text-sm"
          >
            {showPassword ? '🙈' : '👁️'}
          </button>
        </div>

        <p className="text-xs text-gray-500">
          {locale === 'ar'
            ? 'كلمة المرور يجب ألا تقل عن 8 أحرف'
            : 'Password must be at least 8 characters'}
        </p>

        <input
          name="password_confirmation"
          type={showPassword ? 'text' : 'password'}
          placeholder={t('confirmPassword')}
          onChange={handleChange}
          className="w-full px-4 py-3 rounded-lg border"
          required
        />

        {error && <p className="text-sm text-red-500 text-center">{error}</p>}

        <button
          disabled={loading}
          className="w-full py-3 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 transition disabled:opacity-60"
        >
          {loading ? '...' : t('button')}
        </button>
      </form>

      <p className="text-center text-sm">
        {t('haveAccount')}{' '}
        <Link
          href={`/${locale}/auth/login`}
          className="text-indigo-600 hover:underline"
        >
          {t('login')}
        </Link>
      </p>
    </div>
  );
}
