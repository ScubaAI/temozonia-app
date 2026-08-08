import type { Product, Category } from "@/types/product";

// ═══════════════════════════════════════════
// CATEGORÍAS
// ═══════════════════════════════════════════
export const CATEGORIES: Category[] = [
  {
    id: "cat-carnes",
    name: "Carnes",
    slug: "carnes",
    description: "Carnes artesanales 100% libres de conservadores",
    image: "/img/categories/carnes.jpg",
  },
];

// ═══════════════════════════════════════════
// PRODUCTOS (sincronizados con BTCPay POS)
// Precios en centavos: 22000 = $220.00 MXN
// ═══════════════════════════════════════════
export const PRODUCTS: Product[] = [
  {
    id: "carne-estilo-temozon",
    slug: "carne-estilo-temozon",
    name: "Carne 100% estilo Temozón",
    description:
      "Carne 100% estilo Temozón, preparada de forma artesanal. 🔴 Libre de conservadores.",
    price: 22000,
    currency: "MXN",
    images: ["/img/products/carne-temozon.jpg"],
    category: "carnes",
    seasonal: false,
    stock: 100,
    metadata: {
      unit: "kg",
      badge: "🔴 Libre de conservadores",
      btcpayPosId: "carne-estilo-temozon",
    },
  },
  {
    id: "costilla-ahumada",
    slug: "costilla-ahumada",
    name: "Costilla Ahumada",
    description:
      "Costilla ahumada lentamente de forma artesanal. 🔴 Libre de conservadores.",
    price: 22000,
    currency: "MXN",
    images: ["/img/products/costilla-ahumada.jpg"],
    category: "carnes",
    seasonal: false,
    stock: 100,
    metadata: {
      unit: "kg",
      badge: "🔴 Libre de conservadores",
      btcpayPosId: "costilla-ahumada",
    },
  },
  {
    id: "longaniza-carne",
    slug: "longaniza-carne",
    name: "Longaniza de Carne",
    description:
      "Longaniza 100% de carne, ¡no es soya! 🔴 Libre de conservadores.",
    price: 22000,
    currency: "MXN",
    images: ["/img/products/longaniza.jpg"],
    category: "carnes",
    seasonal: false,
    stock: 100,
    metadata: {
      unit: "kg",
      badge: "🔴 Libre de conservadores",
      btcpayPosId: "longaniza-carne",
    },
  },
];

// ═══════════════════════════════════════════
// ZONAS DE ENVÍO (se mantiene)
// ═══════════════════════════════════════════
export const SHIPPING_ZONES = [
  { id: "merida", name: "Mérida", fee: 0, eta: "1-2 días", labelKey: "merida" },
  { id: "yucatan", name: "Yucatán", fee: 8000, eta: "2-3 días", labelKey: "yucatan" },
  { id: "nacional", name: "Nacional", fee: 15000, eta: "3-5 días", labelKey: "nacional" },
];

export const DELIVERY_ZONES = SHIPPING_ZONES;

export const SITE = {
  freeShippingThreshold: 50000,
};