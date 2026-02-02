'use client';

import { useRouter, usePathname } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';

export default function UserMenu() {
  const { user, logout } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const locale = pathname.split('/')[1];

  if (!user) return null;

  const avatarUrl =
    (user as any)?.profile?.avatar
      ? `${process.env.NEXT_PUBLIC_API_URL}/storage/${(user as any).profile.avatar}`
      : null;

  function handleLogout() {
    logout();
    router.replace(`/${locale}/auth/login`);
  }

  return (
    <div className="relative group">
      {/* Avatar */}
      <button className="w-9 h-9 rounded-full overflow-hidden border bg-muted flex items-center justify-center">
        {avatarUrl ? (
          <img
            src={avatarUrl}
            alt={user.name}
            className="w-full h-full object-cover"
          />
        ) : (
          <span className="text-sm font-semibold text-gray-600">
            {user.name.charAt(0)}
          </span>
        )}
      </button>

      {/* Dropdown */}
      <div className="absolute right-0 mt-3 w-56 bg-background border rounded-xl shadow-lg
        opacity-0 group-hover:opacity-100 pointer-events-none group-hover:pointer-events-auto transition">

        {/* User Info */}
        <div className="px-4 py-3 border-b">
          <p className="text-sm font-medium">{user.name}</p>
          {user.username && (
            <p className="text-xs text-muted-foreground">
              @{user.username}
            </p>
          )}
        </div>

        {/* Actions */}
        <div className="py-1">
          <button
            onClick={() => router.push(`/${locale}/profile`)}
            className="w-full text-left px-4 py-2 text-sm hover:bg-muted"
          >
            Edit Profile
          </button>

          {user.username && (
            <button
              onClick={() => router.push(`/${locale}/u/${user.username}`)}
              className="w-full text-left px-4 py-2 text-sm hover:bg-muted"
            >
              View Public Profile
            </button>
          )}

          <button
            onClick={() => router.push(`/${locale}/dashboard`)}
            className="w-full text-left px-4 py-2 text-sm hover:bg-muted"
          >
            Dashboard
          </button>
        </div>

        {/* Logout */}
        <div className="border-t">
          <button
            onClick={handleLogout}
            className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-muted"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}
