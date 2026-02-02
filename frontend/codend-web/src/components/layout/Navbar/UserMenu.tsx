'use client';

import { useRouter, usePathname } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';

export default function UserMenu() {
  const { user, logout } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const locale = pathname.split('/')[1];

  if (!user) return null;

  function handleLogout() {
    logout();
    router.replace(`/${locale}/auth/login`);
  }

  return (
    <div className="relative group">
      <button className="flex items-center gap-2 px-3 py-2 rounded-full bg-muted">
        <span className="text-sm font-medium">{user.name}</span>
        <span>▾</span>
      </button>

      <div className="absolute right-0 mt-2 w-44 bg-background border rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition">
        <button
          onClick={() => router.push(`/${locale}/dashboard`)}
          className="w-full text-left px-4 py-2 text-sm hover:bg-muted"
        >
          Dashboard
        </button>

        <button
          onClick={handleLogout}
          className="w-full text-left px-4 py-2 text-sm hover:bg-muted text-red-600"
        >
          Logout
        </button>
      </div>
    </div>
  );
}
