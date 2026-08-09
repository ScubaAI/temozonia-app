"use client";

import { useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import { ExternalLink, Zap } from "lucide-react";

export function BullBitcoinWalletButton() {
  const t = useTranslations("footer.wallet");
  
  const [downloadUrl, setDownloadUrl] = useState(
    "https://play.google.com/store/search?q=bull%20bitcoin&c=apps&hl=es"
  );

  useEffect(() => {
    const userAgent = window.navigator.userAgent.toLowerCase();
    const isApple = /iphone|ipad|ipod|macintosh/.test(userAgent);

    if (isApple) {
      setDownloadUrl("https://apps.apple.com/us/app/bull-bitcoin/id6743380972");
    }
  }, []);

  return (
    <a
      href={downloadUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="group relative flex w-full items-center gap-3 rounded-xl border-2 border-gold/40 bg-dark-wood/50 p-4 transition-all duration-300 hover:border-gold hover:bg-dark-wood hover:shadow-gold-glow"
    >
      <div className="relative flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full border-2 border-gold bg-gradient-to-br from-gold-500 to-gold-300 shadow-lg">
        <span className="text-2xl transition-transform duration-300 group-hover:scale-110 group-hover:rotate-12">
          
        </span>
        <div className="absolute -bottom-1 -right-1 flex h-6 w-6 items-center justify-center rounded-full bg-dark-wood border border-gold">
          <Zap size={12} className="text-gold-300" />
        </div>
      </div>

      <div className="flex flex-1 flex-col text-left">
        <span className="font-display text-[10px] uppercase tracking-widest text-gold-300 font-bold">
          {t("label")}
        </span>
        <span className="font-body text-sm font-bold text-cream flex items-center gap-1">
          {t("appName")}
          <span className="font-display text-[10px] text-cream/60 font-normal">
            ⚡ {t("network")}
          </span>
        </span>
      </div>

      <ExternalLink 
        size={16} 
        className="text-gold flex-shrink-0 transition-transform duration-300 group-hover:translate-x-1" 
      />
    </a>
  );
}
