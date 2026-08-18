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

export interface OrderFormData {
  customer: CustomerInfo;
  delivery: Omit<DeliveryInfo, "eta">;
  paymentMethod: PaymentInfo["method"];
}
