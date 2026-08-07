import { getRequestConfig } from 'next-intl/server';
import { defaultLocale, locales } from './routing';

export default getRequestConfig(async ({ locale }) => {
  // Validar que el locale entrante sea válido, si no, usar el default
  const validLocale = locales.includes(locale as any) ? locale : defaultLocale;

  return {
    locale: validLocale,
    messages: (await import(`../../messages/${validLocale}.json`)).default,
  };
});