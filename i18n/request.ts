import {getRequestConfig} from 'next-intl/server';
import {notFound} from 'next/navigation';

const locales = ['en', 'ru', 'en-KG', 'ru-KG'];

export default getRequestConfig(async (params: any) => {
  // Получаем локаль (статичную или ожидаемую через промис)
  const { requestLocale, locale: staticLocale } = params;
  
  let locale = staticLocale;
  
  if (requestLocale) {
    locale = await requestLocale;
  }

  // Если локаль не пришла или она "левая" — ставим дефолт
  if (!locale || !locales.includes(locale)) {
    locale = 'en';
  }

  return {
    // ВАЖНО: Мы должны вернуть саму локаль обратно в конфиг!
    locale, 
    messages: (await import(`../messages/${locale}.json`)).default
  };
});