"use client";

import { useEffect } from "react";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { Button } from "@/components/ui/Button";

export default function GlobalError({
  error,
  reset
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const t = useTranslations("Error");

  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <html lang="es" suppressHydrationWarning>
      <body className="bg-liquid-bg min-h-screen">
        <div className="flex min-h-screen flex-col items-center justify-center text-center">
          <div className="liquid-glass p-12 max-w-md">
            <h1 className="font-display text-5xl text-gold mb-4">
              {t("title")}
            </h1>
            <p className="text-muted-foreground mb-8">{t("description")}</p>
            <div className="flex gap-4 justify-center">
              <Button variant="gold" onClick={() => reset()}>
                {t("tryAgain")}
              </Button>
              <Link href="/">
                <Button variant="secondary">{t("backHome")}</Button>
              </Link>
            </div>
          </div>
        </div>
      </body>
    </html>
  );
}
