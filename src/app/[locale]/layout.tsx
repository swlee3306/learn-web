import type {Metadata} from 'next';
import {NextIntlClientProvider} from 'next-intl';
import {getMessages} from 'next-intl/server';
import Link from 'next/link';
import {locales, type Locale} from '@/i18n/routing';
import MePill from '@/components/MePill';
import './globals.css';

export const metadata: Metadata = {
  title: 'Coding Playground',
  description: 'Learn coding by building fun things.'
};

export default async function LocaleLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: Promise<{locale: string}>;
}) {
  const {locale} = await params;
  if (!locales.includes(locale as Locale)) {
    // Fallback; middleware should prevent this.
    return (
      <html lang="ko">
        <body>{children}</body>
      </html>
    );
  }
  const messages = await getMessages();

  return (
    <html lang={locale}>
      <body>
        <NextIntlClientProvider messages={messages}>
          <header className="topbar">
            <div className="container" style={{display: 'flex', gap: 14, alignItems: 'center', justifyContent: 'space-between'}}>
              <div className="brand">
                <div className="logo" aria-hidden />
                <div>
                  <div className="brandTitle">코딩 놀이터</div>
                  <div className="brandSub">Build small, learn fast · 재미로 시작해서 실력으로</div>
                </div>
              </div>
              <nav className="nav">
                <Link className="pill pillActive" href={`/${locale}`}>Home</Link>
                <Link className="pill" href={`/${locale}/web`}>Web</Link>
                <Link className="pill" href={`/${locale}/python`}>Python</Link>
                <MePill locale={locale} />
                <span style={{opacity: 0.45, padding: '0 4px'}}>•</span>
                {locales.map(l => (
                  <Link key={l} className={`pill ${l === locale ? 'pillActive' : ''}`} href={`/${l}`}>
                    {l.toUpperCase()}
                  </Link>
                ))}
              </nav>
            </div>
          </header>
          <main className="container">{children}</main>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
