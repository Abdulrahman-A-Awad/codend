'use client';

import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { useAuth } from '@/context/AuthContext';
import { updateUserName } from '@/lib/user';

export default function AccountPage() {
  const t = useTranslations('account');
  const { user, refreshUser } = useAuth();

  const [name, setName] = useState('');
  const [saving, setSaving] = useState(false);

  const router = useRouter();
  const pathname = usePathname();
  const locale = pathname.split('/')[1];

  useEffect(() => {
    if (user?.name) {
      setName(user.name);
    }
  }, [user]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);

    try {
      if (name !== user?.name) {
        await updateUserName(name);
        await refreshUser(); // 🔥 يحدث الناف بار فورًا
      }

      router.push(`/${locale}/u/${user?.username}`);
    } finally {
      setSaving(false);
    }
  }

  if (!user) return null;

  return (
    <div className="max-w-xl mx-auto p-6 space-y-6">
      <h1 className="text-2xl font-bold">{t('title')}</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm mb-1">
            {t('name')}
          </label>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-3 border rounded-lg"
            placeholder={t('name')}
          />
        </div>

        <button
          disabled={saving}
          className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:opacity-60"
        >
          {saving ? '...' : t('save')}
        </button>
      </form>
    </div>
  );
}
