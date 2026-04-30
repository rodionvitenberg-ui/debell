import createMiddleware from 'next-intl/middleware';
import { NextRequest } from 'next/server';

// 1. Задаем массив константным и вытаскиваем из него тип
const routingLocales = ['en', 'ru', 'en-KG', 'ru-KG'] as const;
type Locale = typeof routingLocales[number];

export default async function middleware(request: NextRequest) {
  const country = (request as any).geo?.country || request.headers.get('x-vercel-ip-country') || 'US';
  const acceptLanguage = request.headers.get('accept-language') || 'en';
  const isRussian = acceptLanguage.includes('ru');

  // 2. Используем наш строгий тип
  let locale: Locale = 'en'; 

  if (isRussian) {
    if (country === 'KG') {
      locale = 'ru-KG';
    } else {
      locale = 'ru';
    }
  } else {
    if (country === 'KG') {
      locale = 'en-KG';
    } else {
      locale = 'en';
    }
  }

  // 3. Передаем переменные в конфиг
  const handleI18n = createMiddleware({
    locales: routingLocales,
    defaultLocale: locale, // TS полностью доволен
    localePrefix: 'always'
  });

  return handleI18n(request);
}

export const config = {
  matcher: ['/((?!api|_next|.*\\..*).*)']
};