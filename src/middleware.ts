import createMiddleware from 'next-intl/middleware';
import { locales, defaultLocale } from '@/lib/i18n/routing';

export default createMiddleware({
  locales,
  defaultLocale,
  localePrefix: 'always'
});

export const config = {
  // Ignorar rutas de API, archivos estáticos y _next
  matcher: ['/((?!api|_next|_vercel|.*\\..*).*)']
};