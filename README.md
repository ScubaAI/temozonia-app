# Temozonia App

> 🛒 Plataforma de e-commerce de temporada — Next.js 14 App Router + next-intl + Tailwind CSS

Temozonia es una tienda online de productos de temporada (frutas, flores, etc.) con soporte para **Bitcoin vía BTCPay Server**, **Mercado Pago** y **WhatsApp** como canal de atención.

## 🚀 Quick Start

```bash
# 1. Instalar dependencias
npm install

# 2. Configurar variables de entorno
cp .env.example .env.local
# Edit .env.local con tus credenciales

# 3. Desarrollo local
npm run dev
# http://localhost:3000
```

## 📦 Stack

| Capa | Tecnología |
|------|-----------|
| Framework | Next.js 14 (App Router) |
| i18n | next-intl |
| Estilos | Tailwind CSS + Liquid Glass + Gold accents |
| Estado | Zustand (carrito persistente) |
| Pagos | BTCPay Server + Mercado Pago + Stripe |
| Notificaciones | WhatsApp Business API |

## 🌍 Locales

- `es` — Español (default)
- `en` — Inglés (listo para expansión)

## 📚 Documentación

- [Arquitectura](./docs/architecture.md)
- [Design System](./docs/design-system.md)
- [Guía de i18n](./docs/i18n-guide.md)
- [Integraciones API](./docs/api-integrations.md)
- [Deploy en Vercel](./docs/deployment.md)

## 🛠 Scripts

| Script | Descripción |
|--------|-------------|
| `npm run dev` | Servidor de desarrollo |
| `npm run build` | Build de producción |
| `npm run lint` | Lint con ESLint |
| `npm run type-check` | Type check con TypeScript |
| `npm run format` | Formatear con Prettier |
