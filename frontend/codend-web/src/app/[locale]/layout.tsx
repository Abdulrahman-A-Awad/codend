import { ThemeProvider } from '@/components/providers/ThemeProvider';
import I18nProvider from '@/components/providers/I18nProvider';
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
    <div dir={locale === 'ar' ? 'rtl' : 'ltr'} className="min-h-screen">
      <ThemeProvider>
        <I18nProvider locale={locale} messages={messages}>
          {children}
        </I18nProvider>
      </ThemeProvider>
    </div>
  );
}
