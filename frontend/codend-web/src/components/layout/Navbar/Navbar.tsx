'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import UserMenu from './UserMenu';
import LanguageToggle from './LanguageToggle';

export default function Navbar() {
  const pathname = usePathname();
  const locale = pathname.split('/')[1];
  const { user, loading } = useAuth();

  if (loading) return null; // مهم

  return (
    <header className="sticky top-0 z-50 border-b bg-background">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        
        {/* Logo */}
        <Link href={`/${locale}`} className="text-xl font-bold text-indigo-600">
          Code & Design
        </Link>

        {/* Right */}
        <div className="flex items-center gap-4">
          {/* Guest */}
          {!user && (
            <>
              <Link
                href={`/${locale}/auth/login`}
                className="text-sm hover:underline"
              >
                Login
              </Link>
              <Link
                href={`/${locale}/auth/register`}
                className="text-sm hover:underline"
              >
                Register
              </Link>
            </>
          )}

          {/* User */}
         

          {/* Admin */}
          {/* {user?.is_admin && (
            <Link
              href={`/${locale}/admin`}
              className="text-sm font-semibold text-red-600 hover:underline"
            >
              Admin
            </Link>
          )} */}

          <LanguageToggle />

          {/* User Menu */}
          {user && <UserMenu />}
        </div>
      </div>
    </header>
  );
}
