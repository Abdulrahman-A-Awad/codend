'use client';

import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { useAuth } from '@/context/AuthContext';
import { updateUserName, updatePassword } from '@/lib/user';
import toast from 'react-hot-toast';

export default function AccountPage() {
  const t = useTranslations('account');
  const { user, refreshUser } = useAuth();

  const router = useRouter();
  const pathname = usePathname();
  const locale = pathname.split('/')[1];

  const [name, setName] = useState('');

  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [saving, setSaving] = useState(false);

  /* =======================
     Load user name
  ======================= */
  useEffect(() => {
    if (user?.name) {
      setName(user.name);
    }
  }, [user]);

  /* =======================
     Submit (ONE button)
  ======================= */
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);

    try {
      /* =======================
         Update Name (optional)
      ======================= */
      if (name && name !== user?.name) {
        await updateUserName(name);
        await refreshUser();

        toast.success(
          locale === 'ar'
            ? 'تم تحديث الاسم بنجاح'
            : 'Name updated successfully'
        );
      }

      /* =======================
         Update Password (optional)
      ======================= */
      const wantsPasswordChange =
        currentPassword || newPassword || confirmPassword;

      if (wantsPasswordChange) {
        if (!currentPassword || !newPassword || !confirmPassword) {
          toast.error(t('password_error'));
          return;
        }

        if (newPassword !== confirmPassword) {
          toast.error(t('password_error'));
          return;
        }

        await updatePassword({
          current_password: currentPassword,
          password: newPassword,
          password_confirmation: confirmPassword,
        });

        toast.success(t('password_success'));

        // Reset fields
        setCurrentPassword('');
        setNewPassword('');
        setConfirmPassword('');
      }

      router.push(`/${locale}/u/${user?.username}`);
    } catch {
      toast.error(
        locale === 'ar'
          ? 'حدث خطأ أثناء حفظ إعدادات الحساب'
          : 'Failed to update account settings'
      );
    } finally {
      setSaving(false);
    }
  }

  if (!user) return null;

  return (
    <div className="max-w-xl mx-auto p-6 space-y-8">
      <h1 className="text-2xl font-bold">{t('title')}</h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* =======================
            Name
        ======================= */}
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

        {/* =======================
            Password
        ======================= */}
        <div className="space-y-4">
          <div>
            <label className="block text-sm mb-1">
              {t('current_password')}
            </label>
            <input
              type="password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              className="w-full p-3 border rounded-lg"
            />
          </div>

          <div>
            <label className="block text-sm mb-1">
              {t('new_password')}
            </label>
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="w-full p-3 border rounded-lg"
            />
          </div>

          <div>
            <label className="block text-sm mb-1">
              {t('confirm_password')}
            </label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full p-3 border rounded-lg"
            />
          </div>
        </div>

        {/* =======================
            Save Button
        ======================= */}
        <button
          disabled={saving}
          className="w-full px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:opacity-60"
        >
          {saving ? '...' : t('save')}
        </button>
      </form>
    </div>
  );
}
