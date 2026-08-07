# 📐 Arquitectura — Temozonia App

> Decisiones, diagramas y convenciones técnicas para la plataforma de e-commerce Temozonia.

## 1. Visión General

```
┌─────────────────────────────────────────────────────────────┐
│                        Navegador                             │
│                                                             │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌────────────┐   │
│  │ Homepage │  │ Catálogo  │  │ Checkout │  │ Confirmación│   │
│  │          │  │  (menu)   │  │ (pago)   │  │  (order)   │   │
└─────────────────────────────────────────────────────────────┘
                          │  HTTPS / API Routes
                          ▼
┌─────────────────────────────────────────────────────────────┐
│                  Next.js 14 (Vercel Edge)                   │
│                                                             │
│  ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌────────────────┐│
│  │ src/app  │ │ src/components │ │ src/services │ │ src/store │ │
│  │ (routing, │ │ (UI domain)    │ │ (external API) │ │ (Zustand) │ │
│  │ API, pages)│ │                │ │                │ │            │
│  └──────────┘ └──────────┘ └──────────┘ └────────────────┘│
└─────────────────────────────────────────────────────────────┘
                          │
        ┌─────────────────┼──────────────────────────┐
        ▼                 ▼                          ▼
  ┌──────────┐  ┌────────────────┐  ┌────────────────────────┐
  │ BTCPay   │  │ Mercado Pago   │  │ WhatsApp Business API  │
  │ Server   │  │ (Stripe fallback)│ │ (notificaciones)       │
  └──────────┘  └────────────────┘  └────────────────────────┘
```

## 2. Decisiones Técnicas (ADRs)

### ADR-001: Next.js App Router
Next.js 14 con el App Router se eligió como framework principal por:
- Soporte nativo de i18n mediante `next-intl`.
- API Routes integradas (backend ligero dentro del propio deploy).
- Optimización de imágenes y rendimiento en Vercel Edge.
- Nested layouts y route groups para organización de flujos.

### ADR-002: next-intl como biblioteca de i18n
Se eligió `next-intl` en lugar de `react-i18next` porque:
- Integración nativa con el App Router de Next.js 14.
- Routing con segmento dinámico `[locale]` (es, en).
- Carga perezosa (lazy load) de diccionarios JSON por idioma.
- Soporte de TypeScript para claves de traducción.

### ADR-003: BTCPay Server como pasarela BTC
Se utiliza BTCPay Server como capa de pago en Bitcoin porque:
- Código abierto y auto-hosteable.
- No custodia de fondos (los fondos van directamente a tu billetera).
- Webhook para confirmación de pagos.
- Soporte para Lightning Network.

### ADR-004: Zustand para estado del carrito
Se elige Zustand en lugar de Redux por:
- Menor boilerplate.
- Integración con localStorage para persistencia.
- API basada en hooks (idiomática de React).

### ADR-005: Liquid Glass + Gold
El estilo visual "Liquid Glass" (fondos translúcidos con blur) y acentos dorados (#D4AF37) se basan en:
- `backdrop-filter: blur()` para efecto vidrio líquido.
- Clases utilitarias y componentes personalizados en Tailwind config.
- Componentes reutilizables en `src/components/ui`.

## 3. Estructura de Carpetas

La estructura del proyecto sigue el patrón estándar del Next.js App Router con una separación de responsabilidades clara:

```
src/
├── app/                    # Rutas, layouts y API Routes (App Router)
│   ├── api/                # Endpoints de API (Backend)
│   │   ├── btcpay/         # Creación de facturas BTCPay Server
│   │   ├── mercadopago/    # Creación de preferencias Mercado Pago
│   │   ├── stripe/         # Sesiones de checkout Stripe fallback
│   │   ├── webhook/btcpay/ # Callback de confirmación de BTCPay
│   │   └── whatsapp/       # Proxy para envío de mensajes de WhatsApp
│   ├── [locale]/           # Enrutamiento dinámico internacionalizado
│   │   ├── (shop)/         # Páginas principales (cart, checkout, menu, order/[id])
│   │   ├── layout.tsx      # Layout principal con next-intl y estilos globales
│   │   ├── not-found.tsx   # Página de error 404 localizada
│   │   └── page.tsx        # Homepage del sitio
│   └── global-error.tsx    # Manejo global de errores
├── components/             # Componentes React
│   ├── features/           # Componentes específicos del dominio (cart, delivery, landing, payment, product, receipt)
│   ├── layout/             # Componentes de estructura global (Header, Footer, WhatsAppFloat)
│   └── ui/                 # Componentes genéricos de diseño (Badge, Button, Card, Input, Modal)
├── hooks/                  # Hooks personalizados de React (useLocale, useMediaQuery)
├── lib/                    # Configuración de librerías, constantes y utilidades
│   ├── i18n/               # Configuración del motor next-intl (request.ts, routing.ts)
│   ├── constants.ts        # Reglas de negocio, zonas de envío y datos mock
│   ├── formatters.ts       # Formateadores de moneda, fecha y teléfono
│   └── utils.ts            # Utilidad helper clsx/tailwind-merge
├── messages/               # Diccionarios de traducción JSON (es.json, en.json)
├── services/               # Clientes HTTP y SDKs para APIs externas
│   ├── btcpay.service.ts   # Creación de facturas y validación de firma HMAC
│   ├── mercadopago.service.ts # Preferencias, pagos y firmas de Mercado Pago
│   └── whatsapp.service.ts # Clientes de envío de plantillas y textos de WhatsApp
├── store/                  # Estado global con Zustand (cartStore.ts)
├── styles/                 # Hojas de estilo globales y efectos especiales (globals.css, animations.css)
├── types/                  # Definiciones de tipos TypeScript (product.ts, order.ts, i18n.ts, zustand.d.ts)
└── middleware.ts           # Middleware para redirección de locales y caché en el Edge
```

| Carpeta | Responsabilidad |
|---------|-----------------|
| [src/app/](file:///c:/Users/PAV/Desktop/Aceptabitcoin/temozonia/src/app) | Routing, layouts, API routes (App Router) |
| [src/components/](file:///c:/Users/PAV/Desktop/Aceptabitcoin/temozonia/src/components) | Componentes UI reutilizables + features del dominio |
| [src/lib/](file:///c:/Users/PAV/Desktop/Aceptabitcoin/temozonia/src/lib) | Utilidades puras, helpers, tipos compartidos |
| [src/services/](file:///c:/Users/PAV/Desktop/Aceptabitcoin/temozonia/src/services) | Clientes HTTP hacia APIs externas |
| [src/store/](file:///c:/Users/PAV/Desktop/Aceptabitcoin/temozonia/src/store) | Estado global (Zustand) |
| [src/hooks/](file:///c:/Users/PAV/Desktop/Aceptabitcoin/temozonia/src/hooks) | Custom hooks de React |
| [src/types/](file:///c:/Users/PAV/Desktop/Aceptabitcoin/temozonia/src/types) | Definiciones de TypeScript |
| [src/messages/](file:///c:/Users/PAV/Desktop/Aceptabitcoin/temozonia/src/messages) | Archivos JSON de traducción |
| [src/styles/](file:///c:/Users/PAV/Desktop/Aceptabitcoin/temozonia/src/styles) | CSS global y animaciones |
| [public/](file:///c:/Users/PAV/Desktop/Aceptabitcoin/temozonia/public) | Assets estáticos (fuentes, imágenes, iconos) |

## 4. Flujo de Compra (Checkout Flow)

```
1. Cliente navega al catálogo (/[locale]/menu)
   │
2. Agrega productos al carrito (Zustand → localStorage: "temozonia-cart")
   │
3. Hace click en "Checkout" → /[locale]/checkout
   │
4. Selecciona método de pago:
   ├── Bitcoin (BTCPay Server)
   │   - POST /api/btcpay/create-invoice
   │   - Redirige a BTCPay checkout
   │   - Webhook listening: /api/webhook/btcpay
   │
   ├── Mercado Pago (Fiat)
   │   - POST /api/mercadopago/create-preference
   │   - Redirige a checkout de MP
   │
   └── Stripe (fallback fiat)
       - POST /api/stripe/create-checkout
       - Redirige a checkout de Stripe
   │
5. Pago confirmado → redirección a /[locale]/order/[id]
   │
6. Se muestra recibo digital + envío de WhatsApp
   └── POST /api/whatsapp (Notificación al cliente y/o administrador)
   └── (Nota: Integración de correo electrónico no está implementada)
```

## 5. Arquitectura de Datos

### 5.1 Productos ([product.ts](file:///c:/Users/PAV/Desktop/Aceptabitcoin/temozonia/src/types/product.ts))

```ts
export interface Product {
  id: string;
  slug: string;
  name: string;
  description: string;
  price: number;        // Precio en centavos (ej. 25000 = $250.00 MXN)
  currency: string;     // "MXN", "USD", "BTC"
  images: string[];
  category: string;
  seasonal: boolean;
  stock: number;
  metadata?: Record<string, unknown>;
}

export interface ProductVariant {
  id: string;
  name: string;
  priceModifier: number;
  stock: number;
}

export interface ProductWithVariants extends Product {
  variants?: ProductVariant[];
}

export type ProductCategory =
  | "frutas"
  | "flores"
  | "otros"
  | "verduras"
  | "miel"
  | "vinos";

export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  image: string;
}
```

### 5.2 Órdenes ([order.ts](file:///c:/Users/PAV/Desktop/Aceptabitcoin/temozonia/src/types/order.ts))

```ts
import { type Locale } from "@/lib/i18n/routing";

export interface CustomerInfo {
  name: string;
  email: string;
  phone: string;
  address: string;
}

export const ORDER_STATUS = {
  PENDING: "pending",
  PAID: "paid",
  CONFIRMED: "confirmed",
  SHIPPED: "shipped",
  DELIVERED: "delivered",
  FAILED: "failed",
  REFUNDED: "refunded"
} as const;

export type OrderStatus = (typeof ORDER_STATUS)[keyof typeof ORDER_STATUS];

export interface OrderItem {
  id: string;
  productId: string;
  name: string;
  description: string;
  price: number;
  quantity: number;
  image?: string;
  currency: string;
}

export interface PaymentInfo {
  method: "btc" | "mercadopago" | "stripe";
  status: OrderStatus;
  provider: string;
  providerOrderId?: string;
  txId?: string;
  invoiceId?: string;
  amount?: number;
}

export interface DeliveryInfo {
  zone: string;
  fee: number;
  eta: string;
  address: string;
}

export interface Order {
  id: string;
  items: OrderItem[];
  subtotal: number;
  tax: number;
  deliveryFee: number;
  total: number;
  currency: string;
  discount?: number;
  payment: PaymentInfo;
  customer: CustomerInfo;
  delivery: DeliveryInfo;
  locale: Locale;
  createdAt: string; // ISO String para serialización fácil
  updatedAt: string; // ISO String para serialización fácil
  notes?: string;
}
```

### 5.3 Estado del Carrito ([cartStore.ts](file:///c:/Users/PAV/Desktop/Aceptabitcoin/temozonia/src/store/cartStore.ts))

```ts
export interface CartItem extends Omit<Product, "id"> {
  id: string;
  quantity: number;
  image?: string;
  price: number;
  currency: string;
  name: string;
  description: string;
}

interface CartState {
  items: CartItem[];
  isOpen: boolean;
  addItem: (product: Product) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  openCart: () => void;
  closeCart: () => void;
  toggleCart: () => void;
  getTotal: () => number;
  getItemCount: () => number;
}
```

## 6. Integraciones Externas

| Servicio | Responsabilidad | Archivo de Cliente / Endpoint | Métodos clave |
|----------|-----------------|-------------------------------|---------------|
| **BTCPay Server** | Generación de facturas Bitcoin (on-chain / lightning), verificación de firmas y webhooks de cobro. | [btcpay.service.ts](file:///c:/Users/PAV/Desktop/Aceptabitcoin/temozonia/src/services/btcpay.service.ts)<br>Webhook: [route.ts](file:///c:/Users/PAV/Desktop/Aceptabitcoin/temozonia/src/app/api/webhook/btcpay/route.ts) | `createInvoice`, `verifyBtcpaySignature`, `getInvoiceStatus`, `updateOrderFromBtcpay` |
| **Mercado Pago** | Generación de checkout preferences, validación de firmas y transacciones fiat (MXN). | [mercadopago.service.ts](file:///c:/Users/PAV/Desktop/Aceptabitcoin/temozonia/src/services/mercadopago.service.ts) | `createPreference`, `getPaymentStatus`, `verifyWebhookSignature` |
| **WhatsApp Business API** | Envío de confirmaciones de órdenes en texto plano al cliente y notificaciones internas al admin. | [whatsapp.service.ts](file:///c:/Users/PAV/Desktop/Aceptabitcoin/temozonia/src/services/whatsapp.service.ts)<br>Proxy API: [route.ts](file:///c:/Users/PAV/Desktop/Aceptabitcoin/temozonia/src/app/api/whatsapp/route.ts) | `sendWhatsAppMessage`, `sendOrderConfirmation` |
| **Stripe** | Procesamiento de checkout fallback para pagos tradicionales (tarjetas de crédito/débito). | Ruta API: [route.ts](file:///c:/Users/PAV/Desktop/Aceptabitcoin/temozonia/src/app/api/stripe/create-checkout/route.ts) | Utiliza directamente el cliente `stripe` de NPM. |

> [!NOTE]
> Las firmas y firmas HMAC de los webhooks están implementadas para **BTCPay Server** y **Mercado Pago**, pero solo existe un route handler activo para el webhook de BTCPay Server (`/api/webhook/btcpay`). Mercado Pago y Stripe no tienen controladores de webhook activos en `/api/webhook`.

## 7. Convenciones de Código

- **Componentes**: PascalCase para componentes, camelCase para funciones, hooks y variables.
- **Estilos**: Tailwind CSS con variables definidas en config. Clases utilitarias y efectos del design system `.liquid-glass` y `.gold-accent` encapsuladas en [tailwind.config.ts](file:///c:/Users/PAV/Desktop/Aceptabitcoin/temozonia/tailwind.config.ts).
- **Tipos**: Interfaces para modelos de datos complejos, types para unions o alias.
- **Internacionalización (i18n)**: Todo texto visible al usuario debe estar en los diccionarios (`messages/es.json`, `messages/en.json`) usando `next-intl` (`useTranslations`/`getTranslations`).
- **Commits**: Seguir el estándar de Conventional Commits (`feat:`, `fix:`, `docs:`, `chore:`).
