// src/lib/constants.ts
import { type Locale } from "@/lib/i18n/routing";
import type { Product } from "@/types/product";

/**
 * CONSTANTES GLOBALES DE TEMOZONIA
 * Centraliza datos de contacto, configuración y URLs externas.
 */

// ============================================
// 1. CONTACTO Y UBICACIÓN
// ============================================
export const BUSINESS = {
  name: "Temozonia Carnes Ahumadas",
  phone: {
    // Formato internacional sin el símbolo + (para URLs de WhatsApp)
    raw: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "5219994918221",
    // Formato legible para mostrar en UI
    display: "+52 1 999 491 8221",
  },
  email: process.env.NEXT_PUBLIC_CONTACT_EMAIL || "hola@temozonia.com",
  address: {
    street: "Calle Principal #123",
    city: "Temozón",
    state: "Yucatán",
    country: "México",
    postalCode: "97750",
  },
  coordinates: {
    lat: parseFloat(process.env.NEXT_PUBLIC_MAP_LAT || "20.7883"),
    lng: parseFloat(process.env.NEXT_PUBLIC_MAP_LNG || "-88.1200"),
  },
  social: {
    instagram: "https://instagram.com/temozonia",
    facebook: "https://facebook.com/temozonia",
  },
};

// ============================================
// 2. WHATSAPP (Mensajes dinámicos por idioma)
// ============================================
export const WHATSAPP_MESSAGES: Record<Locale, string> = {
  es: "Hola Temozonia Carnes Ahumadas! Me gustaría hacer un pedido...",
  en: "Hello Temozonia Smoked Meats! I would like to place an order...",
};

export const WHATSAPP_FLOAT_MESSAGES: Record<Locale, string> = {
  es: "¿Necesitas ayuda? Escríbenos por WhatsApp",
  en: "Need help? Message us on WhatsApp",
};

// ============================================
// 3. FORMULARIO DE MAYOREO (WHOLESALE)
// ============================================
export const WHOLESALE_CONFIG = {
  // Reemplazar TU_ID_DE_FORMULARIO_AQUI por el ID real de Google Forms
  formUrl:
    process.env.NEXT_PUBLIC_WHOLESALE_FORM_URL ||
    "https://docs.google.com/forms/d/e/TU_ID_DE_FORMULARIO_AQUI/viewform",
  fields: {
    // Reemplazar entry.111111111 por los IDs reales de los campos de Google Forms
    name: process.env.NEXT_PUBLIC_WHOLESALE_FIELD_NAME || "entry.111111111",
    email: process.env.NEXT_PUBLIC_WHOLESALE_FIELD_EMAIL || "entry.222222222",
    phone: process.env.NEXT_PUBLIC_WHOLESALE_FIELD_PHONE || "entry.333333333",
    business: process.env.NEXT_PUBLIC_WHOLESALE_FIELD_BUSINESS || "entry.444444444",
    message: process.env.NEXT_PUBLIC_WHOLESALE_FIELD_MESSAGE || "entry.555555555",
  },
};

// ============================================
// 4. PARTNERS BITCOIN
// ============================================
export const BITCOIN_PARTNERS_DATA_URL = "/data/bitcoin-partners.json";

// ============================================
// 5. APP CONFIG
// ============================================
export const APP_CONFIG = {
  defaultLocale: "es" as Locale,
  supportedLocales: ["es", "en"] as const,
  currency: "MXN",
  minOrderAmount: 10000, // $100.00 MXN en centavos
};

export const SITE = {
  freeShippingThreshold: 50000,
};

export const DELIVERY_ZONES = [
  { id: "local", labelKey: "delivery.local", eta: "24h", fee: 0 },
  { id: "regional", labelKey: "delivery.regional", eta: "2-3 días", fee: 1500 },
  { id: "nacional", labelKey: "delivery.nacional", eta: "5-7 días", fee: 3000 },
];

export const CATEGORIES = [
  { id: "1", name: "Carnes", slug: "carnes", description: "", image: "" },
  { id: "2", name: "Frutas", slug: "frutas", description: "", image: "" },
  { id: "3", name: "Verduras", slug: "verduras", description: "", image: "" },
  { id: "4", name: "Miel", slug: "miel", description: "", image: "" },
  { id: "5", name: "Vinos", slug: "vinos", description: "", image: "" },
  { id: "6", name: "Flores", slug: "flores", description: "", image: "" },
  { id: "7", name: "Otros", slug: "otros", description: "", image: "" },
];

export const PRODUCTS: Product[] = [];

// ============================================
// 6. UTILIDADES DERIVADAS
// ============================================
export const getWhatsAppLink = (locale: Locale, customMessage?: string) => {
  const message = customMessage || WHATSAPP_MESSAGES[locale];
  const encoded = encodeURIComponent(message);
  return `https://wa.me/${BUSINESS.phone.raw}?text=${encoded}`;
};