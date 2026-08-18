"use client";

import { useTranslations, useLocale } from "next-intl";
import { Smartphone } from "lucide-react";

interface BullBitcoinWalletButtonProps {
  variant?: "primary" | "ghost";
}

export function BullBitcoinWalletButton({
  variant = "primary",
}: BullBitcoinWalletButtonProps) {
  const t = useTranslations("wallet.bullBitcoin");
  const locale = useLocale();

  const playStoreUrl = `https://play.google.com/store/apps/details?id=com.bullbitcoin.wallet&hl=${locale}`;
  const appStoreUrl = "https://apps.apple.com/app/bull-bitcoin-wallet/id1234567890";

  const baseClasses =
    variant === "primary"
      ? "glass-btn-dark inline-flex items-center gap-2 px-6 py-3 font-display font-bold text-gold"
      : "ghost inline-flex items-center gap-2 px-4 py-2 font-body text-warm-brown hover:text-dark-wood";

  return (
    <div className="flex flex-col gap-3 sm:flex-row">
      <a
        href={playStoreUrl}
        target="_blank"
        rel="noopener noreferrer"
        className={baseClasses}
        aria-label={`${t("downloadApp")} - Google Play`}
      >
        <span aria-hidden="true">🐂</span>
        <Smartphone className="h-5 w-5" aria-hidden="true" />
        <span>Google Play</span>
      </a>

      <a
        href={appStoreUrl}
        target="_blank"
        rel="noopener noreferrer"
        className={baseClasses}
        aria-label={`${t("downloadApp")} - App Store`}
      >
        <span aria-hidden="true">🐂</span>
        <Smartphone className="h-5 w-5" aria-hidden="true" />
        <span>App Store</span>
      </a>
    </div>
  );
}
