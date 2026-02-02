import { notFound } from 'next/navigation';
import { getPublicProfile } from '@/lib/profile';

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
    <div className="max-w-3xl mx-auto p-6 space-y-8">
      
      {/* Header */}
      <div className="flex flex-col items-center text-center space-y-3">
        
        {/* Avatar */}
        <div className="w-32 h-32 md:w-36 md:h-36 rounded-full overflow-hidden border bg-muted flex items-center justify-center">
          {profile.avatar ? (
            <img
              src={`${process.env.NEXT_PUBLIC_API_URL}/storage/${profile.avatar}`}
              alt={data.name}
              className="w-full h-full object-cover"
            />
          ) : (
            <span className="text-4xl font-bold text-gray-500">
              {data.name.charAt(0)}
            </span>
          )}
        </div>

        {/* Name */}
        <h1 className="text-3xl font-bold">{data.name}</h1>

              {/* Bio */}
      {profile.bio && (
        <p className="text-gray-600 leading-relaxed text-center">
          {profile.bio}
        </p>
      )}

        {/* Field */}
        {profile.field && (
          <p className="text-sm text-muted-foreground">
            {profile.field}
          </p>
        )}
      </div>


      {/* Links */}
      <div className="flex justify-center flex-wrap gap-6">
        {profile.github_url && (
          <a
            href={profile.github_url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-indigo-600 hover:underline"
          >
            GitHub
          </a>
        )}

        {profile.linkedin_url && (
          <a
            href={profile.linkedin_url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-indigo-600 hover:underline"
          >
            LinkedIn
          </a>
        )}

        {profile.portfolio_url && (
          <a
            href={profile.portfolio_url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-indigo-600 hover:underline"
          >
            Portfolio
          </a>
        )}
      </div>
    </div>
  );
}
