import Link from "next/link";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/Button";

export default function NotFound() {
  const t = useTranslations("NotFound");

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-liquid-bg text-center">
      <div className="liquid-glass p-12 max-w-md">
        <h1 className="font-display text-6xl text-gold mb-4">404</h1>
        <h2 className="text-xl font-script mb-4">{t("title")}</h2>
        <p className="text-muted-foreground mb-8">{t("description")}</p>
        <Link href="/">
          <Button variant="primary">{t("backHome")}</Button>
        </Link>
      </div>
    </div>
  );
}
