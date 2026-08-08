export interface Product {
  id: string;
  slug: string;
  name: string;
  description: string;
  price: number;
  currency: string;
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
