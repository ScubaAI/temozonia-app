"use client";

import { useEffect, useState } from "react";
import { ProductCard } from "./ProductCard";
import { Product } from "@/types/product";
import { getFeaturedProducts, getProducts } from "@/lib/constants";

interface ProductListProps {
  locale?: string;
  featured?: boolean;
  limit?: number;
  category?: string;
}

export default function ProductList({
  locale = "es",
  featured = false,
  limit,
  category
}: ProductListProps) {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let data: Product[];

    if (featured) {
      data = getFeaturedProducts();
    } else if (category) {
      const all = getProducts();
      data = all.filter((p: Product) => p.category === category);
    } else {
      data = getProducts();
    }

    if (limit) {
      data = data.slice(0, limit);
    }

    setProducts(data);
    setLoading(false);
  }, [featured, limit, category]);

  if (loading) {
    return (
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            className="h-[320px] animate-pulse rounded-xl bg-foreground/10"
          />
        ))}
      </div>
    );
  }

  if (!products.length) {
    return (
      <div className="py-12 text-center text-muted-foreground">
        No se encontraron productos.
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} locale={locale} />
      ))}
    </div>
  );
}
