"use client";

import { MessageCircle } from "lucide-react";
import { SITE } from "@/lib/constants";
import { toWhatsAppPhone } from "@/lib/formatters";

export function WhatsAppFloat() {
  const waLink = `https://wa.me/${toWhatsAppPhone(SITE.whatsappAdmin)}?text=${encodeURIComponent("Hola Temozonia, tengo una duda sobre un pedido.")}`;

  return (
    <a
      href={waLink}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg transition-transform hover:scale-110 hover:shadow-xl"
      aria-label="Contactar por WhatsApp"
    >
      <MessageCircle size={28} fill="white" />
    </a>
  );
}