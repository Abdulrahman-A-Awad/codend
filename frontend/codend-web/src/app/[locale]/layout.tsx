import { ThemeProvider } from '@/components/providers/ThemeProvider';
import I18nProvider from '@/components/providers/I18nProvider';
import { Toaster } from 'react-hot-toast';
import Navbar from '@/components/layout/Navbar/Navbar';
import Footer from '@/components/layout/Footer/Footer';
import { AuthProvider } from '@/context/AuthContext';
import { notFound } from 'next/navigation';

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!['ar', 'en'].includes(locale)) notFound();

  const messages = (await import(`../../messages/${locale}.json`)).default;

  return (
    <div
      dir={locale === 'ar' ? 'rtl' : 'ltr'}
      className="min-h-screen flex flex-col"
    >
      <ThemeProvider>
        <I18nProvider locale={locale} messages={messages}>
          <AuthProvider>
            <Navbar />

            <main className="flex-1">
              {children}
            </main>

            <Footer />

            {/* 🔔 Toasts (مرة واحدة في الموقع كله) */}
            <Toaster
              position="top-right"
              toastOptions={{
                duration: 3000,
              }}
            />
          </AuthProvider>
        </I18nProvider>
      </ThemeProvider>
    </div>
  );
}
