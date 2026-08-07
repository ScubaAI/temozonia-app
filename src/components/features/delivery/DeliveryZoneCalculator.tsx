"use client";

import { useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import { Input } from "@/components/ui/Input";

interface DeliveryZone {
  zone: string;
  fee: number;
  eta: string;
}

const deliveryZones: DeliveryZone[] = [
  { zone: "Centro", fee: 49, eta: "24-48h" },
  { zone: "Zona Norte", fee: 79, eta: "48-72h" },
  { zone: "Oriente", fee: 99, eta: "72h" }
];

export function DeliveryZoneCalculator({
  onZoneSelected
}: {
  onZoneSelected: (zone: DeliveryZone) => void;
}) {
  const t = useTranslations("Checkout.delivery");
  const [cp, setCp] = useState("");
  const [zone, setZone] = useState<DeliveryZone | null>(null);

  useEffect(() => {
    if (cp.length >= 5) {
      const cpNum = parseInt(cp);
      const selected = deliveryZones.find((z) => {
        if (z.zone === "Centro") return cpNum >= 1000 && cpNum < 8000;
        if (z.zone === "Zona Norte") return cpNum >= 8000 && cpNum < 20000;
        return cpNum >= 20000;
      });
      if (selected) {
        setZone(selected);
        onZoneSelected(selected);
      }
    }
  }, [cp, onZoneSelected]);

  return (
    <div className="space-y-4">
      <h3 className="font-display text-xl text-gold">{t("title")}</h3>

      <Input
        label={t("cp")}
        placeholder="12345"
        value={cp}
        onChange={(e) => setCp(e.target.value)}
        maxLength={5}
      />

      {zone && (
        <div className="liquid-glass p-4">
          <p className="text-sm">
            <span className="text-gold">{t("zone")}:</span> {zone.zone}
          </p>
          <p className="text-sm">
            <span className="text-gold">{t("fee")}:</span> ${zone.fee} MXN
          </p>
          <p className="text-sm">
            <span className="text-gold">{t("eta")}:</span> {zone.eta}
          </p>
        </div>
      )}
    </div>
  );
}
