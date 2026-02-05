import { notFound } from 'next/navigation';
import { getPublicProfile } from '@/lib/profile';
import ProfileCard from '@/components/profile/ProfileCard';

export default async function PublicProfilePage({
  params,
}: {
  params: Promise<{ username: string }>;
}) {
  const { username } = await params;

  if (!username || username === 'undefined') {
    notFound();
  }

  const data = await getPublicProfile(username);
  const profile = data.profile;

  return (
    <div className="max-w-3xl mx-auto p-6">
      <ProfileCard
        name={data.name}
        username={data.username}
        avatar={profile.avatar}
        bio={profile.bio}
        field={profile.field}
        country={profile.country}
        university={profile.university}
        department={profile.department}
        github_url={profile.github_url}
        linkedin_url={profile.linkedin_url}
        portfolio_url={profile.portfolio_url}
        locale="ar" // أو استخرجه من pathname لو حابب
      />
    </div>
  );
}
