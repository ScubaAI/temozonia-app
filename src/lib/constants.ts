import type { Category, Product } from "@/types/product";

export const SITE = {
  name: "Temozonia",
  whatsappAdmin: "5215512345678", // TODO: número real
  freeShippingThreshold: 150000, // $1,500.00 MXN en centavos
} as const;

export const TAX_RATE = 0; // IVA incluido en precios MXN

export interface DeliveryZone {
  id: string;
  labelKey: string; // clave i18n en messages/*.json
  fee: number;      // centavos
  eta: string;
}

export const DELIVERY_ZONES: DeliveryZone[] = [
  { id: "zone-centro", labelKey: "delivery.zones.centro", fee: 6000, eta: "24–48 h" },
  { id: "zone-metro", labelKey: "delivery.zones.metro", fee: 9500, eta: "48–72 h" },
  { id: "zone-nacional", labelKey: "delivery.zones.nacional", fee: 15000, eta: "3–5 días" },
];

export const CATEGORIES: Category[] = [
  { id: "cat-miel", name: "Miel", slug: "miel", description: "Mieles artesanales de abeja criolla y melipona.", image: "/images/categories/miel.jpg" },
  { id: "cat-vinos", name: "Vinos", slug: "vinos", description: "Vinos de mesa mexicanos.", image: "/images/categories/vinos.jpg" },
  { id: "cat-frutas", name: "Frutas", slug: "frutas", description: "Fruta de temporada de la milpa.", image: "/images/categories/frutas.jpg" },
  { id: "cat-verduras", name: "Verduras", slug: "verduras", description: "Verduras frescas de cultivo tradicional.", image: "/images/categories/verduras.jpg" },
  { id: "cat-flores", name: "Flores", slug: "flores", description: "Flores con identidad y tradición.", image: "/images/categories/flores.jpg" },
  { id: "cat-otros", name: "Otros", slug: "otros", description: "Café, cacao y tesoros de la tierra.", image: "/images/categories/otros.jpg" },
];

export const PRODUCTS: Product[] = [
  {
    id: "prod-miel-criolla", slug: "miel-abeja-criolla",
    name: "Miel de Abeja Criolla", description: "Miel pura cosechada en Los Tuxtlas, sin filtrar ni pasteurizar.",
    price: 18500, currency: "MXN", images: ["/images/products/miel-criolla.jpg"],
    category: "miel", seasonal: false, stock: 24, metadata: { bestSeller: true },
  },
  {
    id: "prod-miel-melipona", slug: "miel-melipona",
    name: "Miel de Melipona", description: "Edición limitada de abeja sin aguijón, sabor floral intenso.",
    price: 42000, currency: "MXN", images: ["/images/products/miel-melipona.jpg"],
    category: "miel", seasonal: true, stock: 8,
  },
  {
    id: "prod-vino-tinto", slug: "vino-mesa-tinto",
    name: "Vino de Mesa Tinto", description: "Vino artesanal del valle de Guadalupe, cuerpo medio.",
    price: 38500, currency: "MXN", images: ["/images/products/vino-tinto.jpg"],
    category: "vinos", seasonal: false, stock: 15,
  },
  {
    id: "prod-cafe-altura", slug: "cafe-de-altura",
    name: "Café de Altura", description: "Grano lavado de Chiapas, tueste medio, notas de chocolate.",
    price: 26000, currency: "MXN", images: ["/images/products/cafe.jpg"],
    category: "otros", seasonal: false, stock: 30, metadata: { bestSeller: true },
  },
  {
    id: "prod-cempasuchil", slug: "flor-de-cempasuchil",
    name: "Flor de Cempasúchil", description: "Manojo fresco de temporada, directo del ejido.",
    price: 12000, currency: "MXN", images: ["/images/products/cempasuchil.jpg"],
    category: "flores", seasonal: true, stock: 40,
  },
  {
    id: "prod-canasta-frutas", slug: "canasta-frutas-temporada",
    name: "Canasta de Frutas de Temporada", description: "Selección semanal de fruta madura de la milpa.",
    price: 22000, currency: "MXN", images: ["/images/products/canasta.jpg"],
    category: "frutas", seasonal: false, stock: 12,
  },
];