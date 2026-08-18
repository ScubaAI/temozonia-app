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
│  └──────────┘  └──────────┘  └──────────┘  └────────────┘   │
│       │              │              │              │         │
│       │   /[locale]/  │   /[locale]/  │   /[locale]/  │       │
│       │   /menu      │   /checkout  │   /order/[id]│        │
└─────────────────────────────────────────────────────────────┘
                           │  HTTPS / API Routes
                           ▼
┌─────────────────────────────────────────────────────────────┐
│                  Next.js 15 (Vercel Edge)                   │
│                                                             │
│  ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌────────────────┐│
│  │ src/app  │ │ src/components │ │ src/services │ │ src/store │ │
│  │ (routing, │ │ (UI domain)    │ │ (external API) │ │ (Zustand) │ │
│  │ API, pages)│ │                │ │                │ │            │
│  └──────────┘ └──────────┘ └──────────┘ └────────────────┘│
└─────────────────────────────────────────────────────────────┘
        │                 │
        │ Prisma ORM      │ HTTPS / APIs
        ▼                 ├─────────────────┬──────────────────────────┬──────────────────────┐
┌──────────────┐          ▼                 ▼                          ▼                      ▼
│  PostgreSQL  │    ┌──────────┐  ┌────────────────┐  ┌────────────────────────┐  ┌───────────────┐
│  Database    │    │ BTCPay   │  │ Mercado Pago   │  │ WhatsApp Business API  │  │   Skydropx    │
│  (Prisma)    │    │ Server   │  │ (Stripe fallback)│ │ (notificaciones)       │  │ (envíos/rates)│
└──────────────┘    └──────────┘  └────────────────┘  └────────────────────────┘  └───────────────┘
```

## 2. Decisiones Técnicas (ADRs)

### ADR-001: Next.js 15 App Router
Se utiliza Next.js 15 con el App Router como framework principal por:
- Soporte nativo de i18n mediante `next-intl` adaptado a las firmas asíncronas de Next.js 15.
- API Routes integradas para lógica server-side ligera.
- Optimización de imágenes y rendimiento en Vercel Edge.
- Nested layouts y route groups para organización limpia.

### ADR-002: next-intl como biblioteca de i18n
Se eligió `next-intl` en lugar de `react-i18next` porque:
- Integración nativa con el App Router de Next.js 15.
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
- Clases utilitarias y componentes personalizados en la configuración de Tailwind CSS.
- Componentes de diseño unificados expuestos en `src/components/ui`.

### ADR-006: Prisma ORM con PostgreSQL
Se seleccionó Prisma como ORM para la persistencia de datos (órdenes e ítems) porque:
- Definición declarativa de esquemas de base de datos relacionales (`schema.prisma`).
- Cliente autogenerado y tipado estático seguro.
- Integración robusta con bases de datos PostgreSQL en la nube.

### ADR-007: Skydropx para cotización de envíos
Se integró Skydropx para el cálculo dinámico de tarifas de paquetería y tiempos de entrega en tiempo real, permitiendo cotizar con múltiples transportistas (FedEx, DHL, Estafeta) directamente en el formulario de Checkout.

## 3. Estructura de Carpetas

La estructura del proyecto sigue el patrón estándar de Next.js 15 App Router:

```
prisma/                     # Archivos de configuración de la base de datos
└── schema.prisma           # Esquema declarativo de base de datos (PostgreSQL)
src/
├── app/                    # Rutas, layouts y API Routes (App Router)
│   ├── api/                # Endpoints de API (Backend)
│   │   ├── btcpay/         # Creación de facturas BTCPay Server
│   │   │   └── create-invoice/route.ts
│   │   ├── mercadopago/    # Creación de preferencias Mercado Pago
│   │   │   └── create-preference/route.ts
│   │   ├── orders/         # Creación y guardado de órdenes con Prisma
│   │   │   └── route.ts
│   │   ├── shipping/       # Cálculo de tarifas de envíos con Skydropx
│   │   │   └── rates/route.ts
│   │   ├── stripe/         # Sesiones de checkout Stripe fallback
│   │   │   └── create-checkout/route.ts
│   │   ├── webhook/        # Webhooks de confirmación
│   │   │   ├── btcpay/     # Confirmación de facturas Bitcoin
│   │   │   │   └── route.ts
│   │   │   └── mercadopago/# Confirmación de transacciones Mercado Pago
│   │   │       └── route.ts
│   │   └── whatsapp/       # Proxy para envío de notificaciones de WhatsApp
│   │       └── route.ts
│   ├── [locale]/           # Enrutamiento dinámico internacionalizado (i18n)
│   │   ├── (shop)/         # Páginas de la tienda (route group)
│   │   │   ├── about/      # Página "Conócenos" + SEO metadata
│   │   │   ├── cart/       # Página del carrito + SEO metadata
│   │   │   ├── checkout/   # Página de checkout (wrapper de CheckoutForm)
│   │   │   ├── contact/    # Página de contacto + SEO metadata
│   │   │   ├── menu/       # Catálogo de productos
│   │   │   ├── order/      # Recibo digital de orden
│   │   │   │   └── [id]/page.tsx
│   │   │   └── wholesale/  # Página de mayoreo + SEO metadata
│   │   ├── design-kit/     # Página interna de control de diseño (QA)
│   │   ├── layout.tsx      # Layout principal, fuentes e inicializadores
│   │   ├── not-found.tsx   # Página de error 404 localizada
│   │   └── page.tsx        # Homepage del sitio
│   └── global-error.tsx    # Manejo global de excepciones
├── components/             # Componentes React
│   ├── features/           # Componentes de negocio
│   │   ├── cart/           # CartView, CartItem, CartDrawer
│   │   ├── checkout/       # CheckoutForm
│   │   ├── delivery/       # DeliveryZoneCalculator
│   │   ├── landing/        # Hero, WhatsAppCTA, BitcoinPartnersMarquee
│   │   ├── order/          # OrderStatusBadge, DigitalReceipt, WhatsAppNotification, ReceiptGold
│   │   ├── payment/        # BullBitcoinWalletButton, PaymentMethodSelector, LiquidGlassTotal
│   │   ├── product/        # ProductCard, ProductList
│   │   └── promo/          # SeasonalPromoCard, SeasonalPromoCarousel
│   ├── layout/             # Componentes estructurales
│   │   ├── Header.tsx
│   │   ├── Footer.tsx
│   │   ├── Navigation.tsx
│   │   ├── WhatsAppFloat.tsx
│   │   ├── WhatsAppCTA.tsx
│   │   └── CartDrawerWrapper.tsx
│   └── ui/                 # Componentes genéricos de diseño
│       ├── Badge.tsx
│       ├── Button.tsx
│       ├── Card.tsx
│       ├── Input.tsx
│       ├── Modal.tsx
│       └── CartTester.tsx
├── data/                   # Archivos de datos estáticos y JSONs
│   ├── bitcoin-partners.json
│   └── seasonal-promos.json
├── hooks/                  # Hooks personalizados de React
├── lib/                    # Configuración de librerías, constantes y utilidades
│   ├── i18n/               # Configuración del motor next-intl
│   │   ├── request.ts
│   │   └── routing.ts
│   ├── constants.ts        # Reglas de negocio, catálogo, zonas de envío
│   ├── formatters.ts       # Formateadores de moneda, fecha y teléfono
│   ├── prisma.ts           # Inicialización y singleton de PrismaClient
│   └── utils.ts            # Utilidad helper clsx/tailwind-merge
├── messages/               # Diccionarios de traducción JSON
│   ├── es.json
│   └── en.json
├── services/               # Clientes y SDKs para servicios de APIs externas
│   ├── btcpay.service.ts
│   ├── mercadopago.service.ts
│   ├── shipping.service.ts
│   └── whatsapp.service.ts
├── store/                  # Estado global con Zustand
│   └── cartStore.ts
├── styles/                 # Hojas de estilo globales y efectos especiales
│   ├── globals.css
│   └── animations.css
├── types/                  # Definiciones de tipos TypeScript
│   ├── product.ts
│   ├── order.ts
│   └── i18n.ts
└── middleware.ts           # Middleware para redirección de locales y control de caché
```

| Carpeta | Responsabilidad |
|---------|-----------------|
| [prisma/](file:///c:/Users/PAV/Desktop/Aceptabitcoin/temozonia/prisma) | Configuración y esquema de la base de datos (ORM) |
| [src/app/](file:///c:/Users/PAV/Desktop/Aceptabitcoin/temozonia/src/app) | Enrutamiento, layouts y controladores de API (Next.js App Router) |
| [src/components/](file:///c:/Users/PAV/Desktop/Aceptabitcoin/temozonia/src/components) | UI reutilizable del diseño y componentes específicos de negocio |
| [src/data/](file:///c:/Users/PAV/Desktop/Aceptabitcoin/temozonia/src/data) | Datos locales en formato JSON (partners, promociones) |
| [src/lib/](file:///c:/Users/PAV/Desktop/Aceptabitcoin/temozonia/src/lib) | Módulos de utilidades compartidas, formateadores y clientes (Prisma) |
| [src/services/](file:///c:/Users/PAV/Desktop/Aceptabitcoin/temozonia/src/services) | Lógica de llamada e integraciones con APIs externas (Stripe, BTCPay, MP, Skydropx) |
| [src/store/](file:///c:/Users/PAV/Desktop/Aceptabitcoin/temozonia/src/store) | Almacenamiento de estado del lado del cliente persistido en local |
| [src/types/](file:///c:/Users/PAV/Desktop/Aceptabitcoin/temozonia/src/types) | Modelos de TypeScript que aseguran el tipado de los datos |

## 4. Flujo de Compra (Checkout Flow)

```
1. Cliente navega al catálogo (/[locale]/menu)
   │
2. Agrega productos al carrito (Zustand → localStorage: "temozonia-cart")
   │
3. Hace click en "Checkout" → /[locale]/checkout
   │
4. Escribe datos de dirección e inicia cotización de envíos:
   └── POST /api/shipping/rates (Skydropx API) → Muestra opciones y recalcula total con envío
   │
5. Selecciona método de pago y envía orden:
   ├── Bitcoin (BTCPay Server)
   │   - POST /api/orders (Prisma crea la orden con status "pending" en DB)
   │   - Llama a createInvoice de BTCPay y actualiza invoiceId/providerOrderId
   │   - Redirige a la URL de pago de BTCPay
   │   - Webhook listening: POST /api/webhook/btcpay → actualiza status a "paid" en DB
   │
   └── Tarjeta / Mercado Pago (Fiat)
       - POST /api/orders (Prisma crea la orden con status "pending" en DB)
       - Llama a createPreference de Mercado Pago y actualiza preferenceId/providerOrderId
       - Redirige a la URL de pago de Mercado Pago
       - Webhook listening: POST /api/webhook/mercadopago → actualiza status a "paid" y txId en DB
   │
6. Pago completado/confirmado → Redirección de retorno a /[locale]/order/[id]
   │
7. Se consulta la orden en la base de datos relacional mediante Prisma y se renderiza el recibo digital ([DigitalReceipt.tsx](file:///c:/Users/PAV/Desktop/Aceptabitcoin/temozonia/src/components/features/receipt/DigitalReceipt.tsx))
   │
8. Se envía la notificación del pedido a WhatsApp
   └── POST /api/whatsapp (Notificación al cliente y/o administrador)
```

## 5. Arquitectura de Datos

### 5.1 Esquema de Base de Datos ([schema.prisma](file:///c:/Users/PAV/Desktop/Aceptabitcoin/temozonia/prisma/schema.prisma))

```prisma
model Order {
  id              String      @id @default(cuid())
  subtotal        Int         // En centavos
  tax             Int         @default(0)
  deliveryFee     Int         // En centavos
  total           Int         // En centavos
  currency        String      @default("MXN")
  discount        Int?

  // Datos del cliente
  customerName    String
  customerEmail   String
  customerPhone   String
  customerAddress String

  // Información de pago
  paymentMethod   String      // "btc", "mercadopago", "stripe"
  paymentStatus   String      @default("pending") // "pending", "paid", "failed", "refunded"
  paymentProvider String?     // "btcpay", "mercadopago", "stripe"
  providerOrderId String?     // ID de la orden en el proveedor externo
  txId            String?     // Hash de transacción (BTC) o payment_id (MP)
  invoiceId       String?     // ID de la factura en BTCPay

  // Información de envío
  deliveryZone    String
  deliveryEta     String
  deliveryAddress String

  // Metadata
  locale          String      @default("es")
  notes           String?
  createdAt       DateTime    @default(now())
  updatedAt       DateTime    @updatedAt

  items           OrderItem[]
}

model OrderItem {
  id          String  @id @default(cuid())
  orderId     String
  productId   String
  name        String
  description String
  price       Int     // En centavos
  quantity    Int
  currency    String  @default("MXN")
  image       String?

  order       Order   @relation(fields: [orderId], references: [id], onDelete: Cascade)
}
```

### 5.2 Productos ([product.ts](file:///c:/Users/PAV/Desktop/Aceptabitcoin/temozonia/src/types/product.ts))

```ts
export interface Product {
  id: string;
  slug: string;
  name: string;
  description: string;
  price: number;        // Precio en centavos (ej. 18500 = $185.00 MXN)
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
  | "carnes"
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

### 5.3 Órdenes ([order.ts](file:///c:/Users/PAV/Desktop/Aceptabitcoin/temozonia/src/types/order.ts))

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
  PROCESSING: "processing",
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
  createdAt: string;
  updatedAt: string;
  notes?: string;
}
```

### 5.4 Estado del Carrito ([cartStore.ts](file:///c:/Users/PAV/Desktop/Aceptabitcoin/temozonia/src/store/cartStore.ts))

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

### 5.5 Constantes y Configuración ([constants.ts](file:///c:/Users/PAV/Desktop/Aceptabitcoin/temozonia/src/lib/constants.ts))

```ts
// Reglas de negocio
export const SITE = {
  freeShippingThreshold: 50000, // En centavos ($500.00 MXN)
};

export const DELIVERY_ZONES = [
  { id: "local", labelKey: "delivery.local", eta: "24h", fee: 0 },
  { id: "regional", labelKey: "delivery.regional", eta: "2-3 días", fee: 1500 },
  { id: "nacional", labelKey: "delivery.nacional", eta: "5-7 días", fee: 3000 },
];

export const CATEGORIES = [
  { id: "1", name: "Carnes", slug: "carnes", description: "", image: "" },
  // ...
];

export const PRODUCTS: Product[] = []; // Catálogo centralizado (pendiente poblar)

// Utilidades
export const BUSINESS = {
  name: "Temozonia Carnes Ahumadas",
  phone: { raw: "...", display: "+52 1 999 491 8221" },
  email: "hola@temozonia.com",
  address: { ... },
  coordinates: { ... },
  social: { ... },
};

export const getWhatsAppLink = (locale: Locale, customMessage?: string) => { ... };
```

### 5.6 Promociones Temporales ([seasonal-promos.json](file:///c:/Users/PAV/Desktop/Aceptabitcoin/temozonia/src/data/seasonal-promos.json))

```ts
export interface SeasonalPromo {
  id: string;
  active: boolean;
  title: string;
  subtitle: string;
  image: string;
  ctaText: string;
  ctaLink: string;
}
```

## 6. Integraciones Externas

| Servicio | Responsabilidad | Archivo de Cliente / Endpoint | Métodos clave |
|----------|-----------------|-------------------------------|---------------|
| **BTCPay Server** | Generación de facturas Bitcoin (on-chain / lightning), verificación de firmas y webhooks de cobro. | [btcpay.service.ts](file:///c:/Users/PAV/Desktop/Aceptabitcoin/temozonia/src/services/btcpay.service.ts)<br>Webhook: [route.ts](file:///c:/Users/PAV/Desktop/Aceptabitcoin/temozonia/src/app/api/webhook/btcpay/route.ts)<br>API: [create-invoice/route.ts](file:///c:/Users/PAV/Desktop/Aceptabitcoin/temozonia/src/app/api/btcpay/create-invoice/route.ts) | `createInvoice`, `verifyBtcpaySignature`, `getInvoiceStatus`, `updateOrderFromBtcpay` |
| **Mercado Pago** | Generación de checkout preferences, validación de firmas y transacciones fiat (MXN). | [mercadopago.service.ts](file:///c:/Users/PAV/Desktop/Aceptabitcoin/temozonia/src/services/mercadopago.service.ts)<br>Webhook: [route.ts](file:///c:/Users/PAV/Desktop/Aceptabitcoin/temozonia/src/app/api/webhook/mercadopago/route.ts)<br>API: [create-preference/route.ts](file:///c:/Users/PAV/Desktop/Aceptabitcoin/temozonia/src/app/api/mercadopago/create-preference/route.ts) | `createPreference`, `getPaymentStatus`, `verifyWebhookSignature` |
| **Skydropx** | Cotización y cálculo dinámico de tarifas de envío y paquetería multicarrier. | [shipping.service.ts](file:///c:/Users/PAV/Desktop/Aceptabitcoin/temozonia/src/services/shipping.service.ts)<br>API: [rates/route.ts](file:///c:/Users/PAV/Desktop/Aceptabitcoin/temozonia/src/app/api/shipping/rates/route.ts) | `getShippingRates` |
| **WhatsApp Business API** | Envío de confirmaciones de órdenes en texto plano al cliente y notificaciones internas al admin. | [whatsapp.service.ts](file:///c:/Users/PAV/Desktop/Aceptabitcoin/temozonia/src/services/whatsapp.service.ts)<br>API: [route.ts](file:///c:/Users/PAV/Desktop/Aceptabitcoin/temozonia/src/app/api/whatsapp/route.ts) | `sendWhatsAppMessage`, `sendOrderConfirmation` |
| **Stripe** | Procesamiento de checkout fallback para pagos tradicionales (tarjetas de crédito/débito). | API: [create-checkout/route.ts](file:///c:/Users/PAV/Desktop/Aceptabitcoin/temozonia/src/app/api/stripe/create-checkout/route.ts) | Utiliza directamente el cliente `stripe` de NPM. |

> [!NOTE]
> Las firmas y firmas HMAC de los webhooks están implementadas para **BTCPay Server** y **Mercado Pago**, y existen controladores de ruta (`route.ts`) activos para ambos webhooks (`/api/webhook/btcpay` y `/api/webhook/mercadopago`). Solo Stripe carece de controlador de webhook en `/api/webhook`.

## 7. Convenciones de Código

- **Componentes**: PascalCase para componentes, camelCase para funciones, hooks y variables.
- **Estilos**: Tailwind CSS con variables definidas en config. Clases utilitarias y efectos del design system `.liquid-glass` y `.gold-accent` encapsuladas en [tailwind.config.ts](file:///c:/Users/PAV/Desktop/Aceptabitcoin/temozonia/tailwind.config.ts).
- **Tipos**: Interfaces para modelos de datos complejos, types para unions o alias.
- **Internacionalización (i18n)**: Todo texto visible al usuario debe estar en los diccionarios (`messages/es.json`, `messages/en.json`) usando `next-intl` (`useTranslations`/`getTranslations`).
- **Commits**: Seguir el estándar de Conventional Commits (`feat:`, `fix:`, `docs:`, `chore:`).

## 8. Estado Actual y Deuda Técnica Frontend

### Completado
- **Arquitectura base**: Next.js 15 App Router con routing dinámico `[locale]` (es, en).
- **i18n**: Diccionarios completos en `messages/es.json` y `messages/en.json` para páginas principales (home, menu, cart, checkout, order, contact, about, wholesale, footer, delivery, notFound, wallet).
- **SEO**: `generateMetadata` implementado en `about`, `contact`, `wholesale`, `cart` y layout principal.
- **Carrito**: Estado global con Zustand + localStorage (`cartStore.ts`), drawer wrapper, vista de carrito y filas de ítem.
- **Checkout**: Formulario completo con selección de zona de envío, cálculo dinámico con Skydropx y selector de método de pago (BTC / Tarjeta).
- **Pagos**: Integración funcional de BTCPay Server y Mercado Pago. Stripe disponible como fallback.
- **Webhooks**: Controladores activos para `/api/webhook/btcpay` y `/api/webhook/mercadopago`.
- **Design System**: Componentes UI base (Button, Badge, Card, Input, Modal) y utilidades de diseño (.liquid-glass, .btn-heritage, .gold-divider, etc.).
- **Componentes de negocio**: `OrderStatusBadge`, `DigitalReceipt`, `WhatsAppNotification`, `BullBitcoinWalletButton`, `BitcoinPartnersMarquee`, `SeasonalPromoCarousel`.
- **Constantes centralizadas**: `SITE`, `DELIVERY_ZONES`, `CATEGORIES`, `PRODUCTS`, `BUSINESS`, `getWhatsAppLink` en `src/lib/constants.ts`.

### Deuda Técnica Pendiente
- **Catálogo de productos**: `PRODUCTS` y `CATEGORIES` en `constants.ts` son arrays vacíos/stub. Se requiere poblar con datos reales o conectar a CMS/API.
- **Formulario de mayoreo**: `wholesale/page.tsx` apunta a un Google Form placeholder (`TU_ID_DE_FORMULARIO_AQUI`). Se requiere reemplazar por el ID real o migrar a un endpoint propio.
- **Datos hardcodeados**: Algunas URLs y valores de negocio (teléfonos, emails, coordenadas) están definidos en `constants.ts` pero deberían provenir de variables de entorno para despliegues multi-ambiente.
- **Build warnings**: Variables unused en `about/page.tsx`, `CartView.tsx`, `WhatsAppCTA.tsx`, `DigitalReceipt.tsx` y uso de `<img>` en lugar de `next/image` en `CartView.tsx`.
- **Stripe webhook**: No existe controlador de webhook para `/api/webhook/stripe`.
