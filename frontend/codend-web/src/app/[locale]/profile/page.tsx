'use client';

import { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';
import { getMyProfile, updateProfile } from '@/lib/profile';
import { useRouter, usePathname } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import toast from 'react-hot-toast';

export default function MyProfilePage() {
  const t = useTranslations('profile');

  const [profile, setProfile] = useState<any>(null);
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const router = useRouter();
  const pathname = usePathname();
  const locale = pathname.split('/')[1];

  const { user, refreshUser } = useAuth();

  /* =======================
     Load profile
  ======================= */
  useEffect(() => {
    getMyProfile().then((res) => {
      setProfile(res.profile);

      if (res.profile.avatar) {
        setAvatarPreview(
          `${process.env.NEXT_PUBLIC_API_URL}/storage/${res.profile.avatar}`
        );
      }

      setLoading(false);
    });
  }, []);

  /* =======================
     Handle input change
  ======================= */
  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  }

  /* =======================
     Submit
  ======================= */
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);

    try {
      const formData = new FormData();

      // Text fields
      if (profile.bio !== undefined) {
        formData.append('bio', profile.bio ?? '');
      }

      if (profile.field !== undefined) {
        formData.append('field', profile.field ?? '');
      }

      if (profile.country !== undefined) {
  formData.append('country', profile.country ?? '');
}

if (profile.university !== undefined) {
  formData.append('university', profile.university ?? '');
}

if (profile.department !== undefined) {
  formData.append('department', profile.department ?? '');
}

      if (profile.github_url) {
        formData.append('github_url', profile.github_url);
      }

      if (profile.linkedin_url) {
        formData.append('linkedin_url', profile.linkedin_url);
      }

      if (profile.portfolio_url) {
        formData.append('portfolio_url', profile.portfolio_url);
      }

      // Avatar upload
      if (profile.avatar instanceof File) {
        formData.append('avatar', profile.avatar);
      }

      // Remove avatar
      if (profile.avatar === null) {
        formData.append('remove_avatar', '1');
      }

      await updateProfile(formData);
      await refreshUser();

      toast.success(
        locale === 'ar'
          ? 'تم حفظ الملف الشخصي بنجاح'
          : 'Profile updated successfully'
      );

      if (user?.username) {
        router.push(`/${locale}/u/${user.username}`);
      }
    } catch {
      toast.error(
        locale === 'ar'
          ? 'حدث خطأ أثناء حفظ الملف الشخصي'
          : 'Failed to update profile'
      );
    } finally {
      setSaving(false);
    }
  }

  if (loading) return <p className="p-6">Loading...</p>;

  return (
    <div className="max-w-3xl mx-auto p-6 space-y-6">
      <h1 className="text-2xl font-bold">{t('edit')}</h1>

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Avatar */}
        <div className="flex items-center gap-6">
          <div className="w-24 h-24 rounded-full overflow-hidden border bg-muted flex items-center justify-center">
            {avatarPreview ? (
              <img
                src={avatarPreview}
                className="w-full h-full object-cover"
                alt="Avatar"
              />
            ) : (
              <span className="text-xl font-semibold text-gray-500">
                {user?.name?.charAt(0)}
              </span>
            )}
          </div>

          <div className="flex flex-col gap-2 text-sm">
            <label className="cursor-pointer text-indigo-600 hover:underline">
              Change photo
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (!file) return;

                  setProfile({ ...profile, avatar: file });
                  setAvatarPreview(URL.createObjectURL(file));
                }}
              />
            </label>

            {avatarPreview && (
              <button
                type="button"
                onClick={() => {
                  setProfile({ ...profile, avatar: null });
                  setAvatarPreview(null);
                }}
                className="text-red-500 hover:underline text-left"
              >
                Remove photo
              </button>
            )}
          </div>
        </div>

        {/* Bio */}
        <textarea
          name="bio"
          value={profile.bio || ''}
          onChange={handleChange}
          placeholder={t('bio')}
          className="w-full p-3 border rounded-lg"
          rows={4}
        />

        {/* Field */}
        <input
          name="field"
          value={profile.field || ''}
          onChange={handleChange}
          placeholder={t('field')}
          className="w-full p-3 border rounded-lg"
        />

        {/* Country */}
<input
  name="country"
  value={profile.country || ''}
  onChange={handleChange}
  placeholder={t('country')}
  className="w-full p-3 border rounded-lg"
/>

{/* University */}
<input
  name="university"
  value={profile.university || ''}
  onChange={handleChange}
  placeholder={t('university')}
  className="w-full p-3 border rounded-lg"
/>

{/* Department */}
<input
  name="department"
  value={profile.department || ''}
  onChange={handleChange}
  placeholder={t('department')}
  className="w-full p-3 border rounded-lg"
/>

        {/* Links */}
        <input
          name="github_url"
          value={profile.github_url || ''}
          onChange={handleChange}
          placeholder="GitHub URL"
          className="w-full p-3 border rounded-lg"
        />

        <input
          name="linkedin_url"
          value={profile.linkedin_url || ''}
          onChange={handleChange}
          placeholder="LinkedIn URL"
          className="w-full p-3 border rounded-lg"
        />

        <input
          name="portfolio_url"
          value={profile.portfolio_url || ''}
          onChange={handleChange}
          placeholder="Portfolio URL"
          className="w-full p-3 border rounded-lg"
        />

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
