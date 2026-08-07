# 🔌 Integraciones API — Temozonia

> Documentación de BTCPay Server, Mercado Pago y WhatsApp.

## 1. BTCPay Server

### 1.1 Cliente (`src/services/btcpay.service.ts`)

```ts
import { BtcpayClient, createInvoice } from "src/services/btcpay.service";

const invoice = await createInvoice({
  price: "250.00",
  currency: "MXN",
  orderId: order.id,
  itemDesc: order.items.map(i => i.name).join(", "),
  redirectURL: `${APP_URL}/es/order/${order.id}`,
  notificationURL: `${APP_URL}/api/webhook/btcpay`,
});
```

### 1.2 Endpoint de Webhook (`/api/webhook/btcpay`)

```
POST /api/webhook/btcpay
Content-Type: application/json
X-Cipherhound-Signature: sha256_hmac=...

{
  "deliveryId": "...",
  "crypto": "BTC",
  "address": "...",
  "value": 0.001,
  "status": "confirmed"
}
```

### 1.3 Variables de entorno

| Variable | Descripción |
|----------|-------------|
| `BTCPAY_SERVER_URL` | URL de tu instancia BTCPay |
| `BTCPAY_STORE_ID` | ID de la tienda en BTCPay |
| `BTCPAY_WEBHOOK_SECRET` | Secret para validar webhooks |
| `BTCPAY_PRIVATE_KEY` | Clave privada Lightning (opcional) |

### 1.4 Flujo BTC

```
Cliente → Next.js → BTCPay Invoice → Cliente paga en wallet →
BTCPay webhook → /api/webhook/btcpay → actualizar orden → redirigir a /es/order/[id]
```

## 2. Mercado Pago

### 2.1 Cliente (`src/services/mercadopago.service.ts`)

```ts
import { MercadoPagoService } from "src/services/mercadopago.service";

const preference = await MercadoPagoService.createPreference({
  items: order.items,
  payer: { email: customer.email },
  back_urls: {
    success: `${APP_URL}/es/order/${order.id}`,
    failure: `${APP_URL}/es/checkout`,
  },
  webhook_url: `${APP_URL}/api/webhook/mercadopago`,
});
```

### 2.2 Variables de entorno

| Variable | Descripción |
|----------|-------------|
| `MERCADO_PAGO_ACCESS_TOKEN` | Token de acceso (test o producción) |
| `MERCADO_PAGO_PUBLIC_KEY` | Public key para frontend |
| `MERCADO_PAGO_WEBHOOK_SECRET` | Secret para validar webhooks |

### 2.3 Webhooks

Endpoint esperado:

```
POST /api/webhook/mercadopago
{
  "action": "payment.updated",
  "data": { "id": "PAYMENT_ID" }
}
```

## 3. WhatsApp Business API

### 3.1 Servicio (`src/services/whatsapp.service.ts`)

```ts
import { sendWhatsAppMessage } from "src/services/whatsapp.service";

const result = await sendWhatsAppMessage({
  to: customer.phone,
  template: "order_confirmation",
  data: {
    orderNumber: order.id,
    total: formatCurrency(order.total, "MXN"),
    items: order.items.map(i => `${i.name} x${i.quantity}`).join("\n")
  }
});
```

### 3.2 Endpoint API (`/api/whatsapp`)

```
POST /api/whatsapp
Body:
{
  "to": "5215500000000",
  "message": "Resumen de orden..."
}
```

### 3.3 Variables de entorno

| Variable | Descripción |
|----------|-------------|
| `WHATSAPP_API_TOKEN` | Token de WhatsApp Business Cloud API |
| `WHATSAPP_PHONE_NUMBER_ID` | ID del número de WhatsApp Business |
| `WHATSAPP_BUSINESS_ACCOUNT_ID` | ID de la cuenta de negocio |
| `WHATSAPP_ADMIN_NUMBER` | Número del admin (para notificaciones internas) |
| `NEXT_PUBLIC_WHATSAPP_ADMIN_NUMBER` | Número público (para botón de chat flotante) |

### 3.4 Templates disponibles

| Template | Uso |
|----------|-----|
| `order_confirmation` | Confirmación de orden al cliente |
| `order_notification` | Notificación al admin de nueva orden |
| `delivery_update` | Actualización de estado de envío |

## 4. Stripe (fallback fiat)

### 4.1 Variables de entorno

| Variable | Descripción |
|----------|-------------|
| `STRIPE_SECRET_KEY` | Clave secreta de Stripe |
| `STRIPE_PUBLISHABLE_KEY` | Clave pública para frontend |

### 4.2 Uso

```tsx
// src/components/features/payment/PaymentMethodSelector.tsx
import { loadStripe } from "@stripe/stripe-js";
const stripe = await loadStripe(STRIPE_PUBLISHABLE_KEY);
```

## 5. Error handling

Todos los servicios exponen un patrón de error consistente:

```ts
class ServiceError extends Error {
  constructor(
    message: string,
    public readonly code: "NETWORK_ERROR" | "AUTH_ERROR" | "VALIDATION_ERROR",
    public readonly statusCode?: number
  ) {
    super(message);
  }
}
```

## 6. Retries y timeouts

- Timeout: 15 segundos por request.
- Retries: 3 intentos con backoff exponencial.
- Circuit breaker: se implementa en el cliente HTTP interno.
