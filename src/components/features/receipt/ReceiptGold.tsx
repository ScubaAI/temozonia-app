"use client";

import { Award } from "lucide-react";
import { Badge } from "@/components/ui/Badge";

interface ReceiptGoldProps {
  orderId: string;
  date: string;
}

export function ReceiptGold({ orderId, date }: ReceiptGoldProps) {
  return (
    <div className="relative overflow-hidden rounded-xl bg-gradient-to-b from-gold-DEFAULT/20 via-gold-DEFAULT/10 to-gold-DEFAULT/5 p-8">
      <div className="absolute inset-0 opacity-10">
        <Award size={200} className="absolute -top-10 -left-10 transform rotate-12" />
      </div>

      <div className="relative flex flex-col items-center text-center">
        <Badge variant="gold" className="mb-4">
          <Award size={16} className="mr-2" />
          Recibo Oficial
        </Badge>

        <h3 className="font-display text-2xl text-gold mb-2">
          Pedido #{orderId}
        </h3>

        <p className="text-sm text-muted-foreground">
          Fecha: {date}
        </p>

        <div className="mt-4 flex items-center justify-center gap-2 text-gold">
          <span className="font-script text-3xl">Temozonia</span>
          <span className="text-xs">™</span>
        </div>
      </div>
    </div>
  );
}
