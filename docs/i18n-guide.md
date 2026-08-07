# 🌍 Guía de i18n — Temozonia

> Cómo agregar, actualizar y mantener traducciones.

## 1. Arquitectura de i18n

```
src/
├── lib/i18n/
│   ├── request.ts    # Server-side: obtener locale, cargar mensajes
│   └── routing.ts    # Configuración de rutas (locales, pathnames)
├── messages/
│   ├── es.json       # Traducciones al español (default)
│   └── en.json       # Traducciones al inglés
└── types/i18n.ts     # Tipos de las claves de traducción
```

## 2. Añadir un nuevo idioma

### Paso 1: Registrar el locale en `routing.ts`

```ts
// src/lib/i18n/routing.ts
export const locales = ["es", "en"] as const;
export const pathnames = {
  "/": {
    es: "/",
    en: "/"
  }
};
```

### Paso 2: Crear el archivo JSON

Copia `es.json` a `en.json` (o el nuevo locale) y traduce cada clave:

```bash
cp src/messages/es.json src/messages/fr.json
```

### Paso 3: Validar claves

Ejecuta:

```bash
npm run type-check
```

Esto verificará que el types de `i18n.ts` incluya el locale.

## 3. Usar traducciones en Server Components

```tsx
// src/app/[locale]/page.tsx (Server Component)
import { getTranslations } from "next-intl/server";

export default async function HomePage({
  params: { locale }
}: {
  params: { locale: string };
}) {
  const t = await getTranslations({ locale, namespace: "Home" });

  return (
    <h1>{t("hero.title")}</h1>
  );
}
```

## 4. Usar traducciones en Client Components

```tsx
// src/components/features/product/ProductCard.tsx (Client Component)
"use client";
import { useTranslations } from "next-intl";

export default function ProductCard({ product }: { product: Product }) {
  const t = useTranslations("Product");

  return (
    <button aria-label={t("addToCart", { name: product.name })}>
      {t("addToCart", { name: product.name })}
    </button>
  );
}
```

## 5. Estructura de claves

Las claves siguen una estructura nested JSON:

```json
{
  "Home": {
    "hero": {
      "title": "Productos de Temporada",
      "subtitle": "..."
    }
  },
  "Product": {
    "addToCart": "{name} — Agregar al carrito",
    "outOfStock": "Agotado"
  }
}
```

Usa namespaces (`Home`, `Product`, `Cart`) para agrupar claves por feature.

## 6. Traducciones con interpolación

```json
{
  "Cart": {
    "itemsCount": "{count} artículo(s) en el carrito"
  }
}
```

```tsx
const t = useTranslations("Cart");
t("itemsCount", { count: cart.items.length });
```

## 7. Pluralización

```json
{
  "Cart": {
    "itemsCount_one": "{count} artículo en el carrito",
    "itemsCount_other": "{count} artículos en el carrito"
  }
}
```

## 8. Traducir rutas

Se usa `next-intl/routing` para traducir paths de URL:

```tsx
// src/lib/i18n/routing.ts
export const locales = ["es", "en"];
export const localePrefix = "always"; // /es, /en

export const pathnames = {
  "/": { es: "/", en: "/" },
  "/menu": { es: "/menu", en: "/menu" },
  "/cart": { es: "/cart", en: "/cart" },
  "/checkout": { es: "/checkout", en: "/checkout" },
  "/order/[id]": { es: "/order/[id]", en: "/order/[id]" }
};
```

## 9. Hook: `useLocale()`

```tsx
// src/hooks/useLocale.ts
import { useLocale } from "next-intl";
import { locales } from "@/lib/i18n/routing";

export function useSwitchLocale() {
  const locale = useLocale();
  const switchedLocale = locale === "es" ? "en" : "es";
  return { locale, switchedLocale, locales };
}
```

## 10. Testing de i18n

Para tests, proporciona los mensajes directamente:

```tsx
// En tests
render(
  <NextIntlClientProvider locale="es" messages={messages}>
    <Component />
  </NextIntlClientProvider>
);
```
