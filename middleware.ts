import createMiddleware from 'next-intl/middleware';
import { NextRequest } from 'next/server';

export default async function middleware(request: NextRequest) {
  // ИСПОЛЬЗУЕМ (request as any), чтобы TS не ругался на .geo
  const country = (request as any).geo?.country || request.headers.get('x-vercel-ip-country') || 'US';
  
  // 2. Определяем предпочтительный язык браузера (из заголовков)
  const acceptLanguage = request.headers.get('accept-language') || 'en';
  const isRussian = acceptLanguage.includes('ru');

  // 3. Логика матрицы 2x2
  let locale = 'en'; // Дефолт (en-Global)

  if (isRussian) {
    if (country === 'KG') {
      locale = 'ru-KG'; // Русский + Кыргызстан
    } else {
      locale = 'ru';    // Русский + Мир
    }
  } else {
    // Если английский (или любой другой язык)
    if (country === 'KG') {
      locale = 'en-KG'; // Английский + Кыргызстан
    } else {
      locale = 'en';    // Английский + Мир
    }
  }

  // 4. Создаем стандартный хендлер next-intl
  const handleI18n = createMiddleware({
    // Список всех поддерживаемых локалей
    locales: ['en', 'ru', 'en-KG', 'ru-KG'],
    
    // Дефолтная локаль, если ничего не совпало (хотя мы выше уже решили)
    defaultLocale: 'en',
    
    // Скрываем префикс локали для дефолтного языка, если нужно
    // Но лучше оставить явно для SEO: /ru, /en, /ru-KG
    localePrefix: 'always'
  });

  // ВАЖНО: Мы не можем просто передать вычисленную `locale` в конфиг middleware статично.
  // Но мы можем сделать редирект, если пользователь зашел на корень '/'.
  
  // Если пользователь пришел просто на '/', редиректим его на вычисленную локаль
  if (request.nextUrl.pathname === '/') {
      return Response.redirect(new URL(`/${locale}`, request.url));
  }

  return handleI18n(request);
}

export const config = {
  // Матчим все пути, кроме статики и api
  matcher: ['/((?!api|_next|.*\\..*).*)']
};