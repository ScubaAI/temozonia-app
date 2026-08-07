# 🚀 Deploy — Temozonia App (Vercel)

> Guía completa para configurar y desplegar la aplicación en Vercel.

## 1. Variables de entorno en Vercel

Configura estas variables en tu proyecto de Vercel (Settings → Environment Variables):

### 1.1 Producción

| Key | Value | Environment |
|-----|-------|-------------|
| `NEXTAUTH_URL` | `https://temozonia-app.vercel.app` | Production |
| `NEXTAUTH_SECRET` | *(secure random string)* | Production |
| `BTCPAY_SERVER_URL` | URL de tu instancia BTCPay | Production |
| `BTCPAY_STORE_ID` | ID de tienda BTCPay | Production |
| `BTCPAY_WEBHOOK_SECRET` | Secret de webhook | Production |
| `BTCPAY_PRIVATE_KEY` | EC private key (opcional) | Production |
| `MERCADO_PAGO_ACCESS_TOKEN` | Token de MP | Production |
| `MERCADO_PAGO_PUBLIC_KEY` | Public key MP | Production |
| `MERCADO_PAGO_WEBHOOK_SECRET` | Secret webhook MP | Production |
| `WHATSAPP_API_TOKEN` | Token WhatsApp Business | Production |
| `WHATSAPP_PHONE_NUMBER_ID` | Phone number ID | Production |
| `WHATSAPP_BUSINESS_ACCOUNT_ID` | Business account ID | Production |
| `WHATSAPP_ADMIN_NUMBER` | Número admin (e164) | Production |
| `STRIPE_SECRET_KEY` | sk_live_... | Production |
| `STRIPE_PUBLISHABLE_KEY` | pk_live_... | Production |
| `APP_URL` | `https://temozonia-app.vercel.app` | Production |

### 1.2 Preview / Development

Marca `NEXT_PUBLIC_APP_URL` y otras variables que empiezan con `NEXT_PUBLIC_` como válidas para todos los entornos (Preview + Production).

Variables sensible (`BTCPAY_PRIVATE_KEY`, `STRIPE_SECRET_KEY`, etc.) deben estar marcadas solo para **Production**.

## 2. Configuración de `next.config.mjs`

Ya está configurado para:
- next-intl (plugin `createNextIntlPlugin`).
- Imágenes remotas (`domains`).
- Builds de producción optimizados.

## 3. Scripts de build

```bash
npm run build   # Vercel lo ejecuta automáticamente
```

### Build output

Vercel detecta Next.js automáticamente. No se necesita `vercel.json` adicional para routing, pero se puede añadir para:

```json
// vercel.json (opcional)
{
  "rewrites": {
    "source": "/ingest/:path*",
    "destination": "https://api.ingest.example.com/:path*"
  }
}
```

## 4. Domínios y routing

- El locale se define por segmento de URL (`/es`, `/en`).
- Configurado con `localePrefix: "always"` en `next-intl/routing`.
- El redirect de locale default (`/`) se maneja en `middleware.ts`.

## 5. Webhooks en Vercel

Los endpoints de webhook deben ser públicos:

- BTCPay: `https://temozonia-app.vercel.app/api/webhook/btcpay`
- Mercado Pago: `https://temozonia-app.vercel.app/api/webhook/mercadopago`

Configúralos en los respectivos dashboards con los `WEBHOOK_SECRET`s.

## 6. CI/CD (GitHub Actions)

El workflow en `.github/workflows/ci.yml` ejecuta:
- `npm run lint`
- `npm run type-check`
- `npm run build`

> **Nota**: Vercel también ejecuta builds automáticos en cada push a `main`.

## 7. Performance tips

- Usa `next/image` con `priority` para hero images.
- Lazy-load componentes pesados (ej. `MercadoPagoCheckout`).
- Cachea respuestas de API externas con `lru-cache` o Vercel KV.
- Prerenderiza páginas estáticas (catálogo de productos) con `generateStaticParams`.

## 8. Monitoreo

Se recomienda integrar:
- **Vercel Analytics** para performance.
- **Sentry** para manejo de errores.
- **LogRocket** para sesiones de usuario.

## 9. Rollback

- Vercel mantiene 10 despliegues anteriores.
- Usa `git revert` o el botón de rollback en el dashboard.
