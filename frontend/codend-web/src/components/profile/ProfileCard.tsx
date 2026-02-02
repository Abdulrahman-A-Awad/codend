'use client';

import Link from 'next/link';

type ProfileCardProps = {
  name: string;
  username: string;
  avatar?: string | null;
  bio?: string | null;
  field?: string | null;
  github_url?: string | null;
  linkedin_url?: string | null;
  portfolio_url?: string | null;
  locale: string;
};

export default function ProfileCard({
  name,
  username,
  avatar,
  bio,
  field,
  github_url,
  linkedin_url,
  portfolio_url,
  locale,
}: ProfileCardProps) {
  const avatarUrl = avatar
    ? `${process.env.NEXT_PUBLIC_API_URL}/storage/${avatar}`
    : null;

  return (
    <div className="border rounded-xl p-6 bg-background shadow-sm space-y-5">
      
      {/* Header */}
      <div className="flex items-center gap-4">
        {/* Avatar */}
        <div className="w-16 h-16 rounded-full overflow-hidden border bg-muted flex items-center justify-center shrink-0">
          {avatarUrl ? (
            <img
              src={avatarUrl}
              alt={name}
              className="w-full h-full object-cover"
            />
          ) : (
            <span className="text-xl font-bold text-gray-500">
              {name.charAt(0)}
            </span>
          )}
        </div>

        {/* Name + Field */}
        <div>
          <Link
            href={`/${locale}/u/${username}`}
            className="text-lg font-semibold hover:underline"
          >
            {name}
          </Link>

          {field && (
            <p className="text-sm text-muted-foreground">
              {field}
            </p>
          )}
        </div>
      </div>

      {/* Bio */}
      {bio && (
        <p className="text-sm text-gray-600 leading-relaxed line-clamp-3">
          {bio}
        </p>
      )}

      {/* Links */}
      <div className="flex flex-wrap gap-4 text-sm">
        {github_url && (
          <a
            href={github_url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-indigo-600 hover:underline"
          >
            GitHub
          </a>
        )}

        {linkedin_url && (
          <a
            href={linkedin_url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-indigo-600 hover:underline"
          >
            LinkedIn
          </a>
        )}

        {portfolio_url && (
          <a
            href={portfolio_url}
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
