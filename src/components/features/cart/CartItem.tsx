"use client";

import Image from "next/image";
import { Minus, Plus, Trash2 } from "lucide-react";
import { CartItem } from "@/store/cartStore";
import { formatCurrency } from "@/lib/formatters";
import { Button } from "@/components/ui/Button";

interface CartItemProps {
  item: CartItem;
  onUpdateQuantity: (id: string, quantity: number) => void;
  onRemove: (id: string) => void;
}

export function CartItemRow({
  item,
  onUpdateQuantity,
  onRemove
}: CartItemProps) {
  return (
    <div className="flex items-center gap-4 py-4 border-b border-gold-500/20 last:border-0">
        <div className="relative h-16 w-16 flex-shrink-0 overflow-hidden rounded-lg">
          <Image
            src={item.image || "/images/placeholder.png"}
            alt={item.name}
            fill
            sizes="64px"
            className="object-cover"
          />
        </div>

      <div className="flex-1">
        <h4 className="font-medium text-gold">{item.name}</h4>
        <p className="text-sm text-muted-foreground">
          {formatCurrency(item.price, item.currency, "es")}
        </p>
      </div>

      <div className="flex items-center gap-1">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => onUpdateQuantity(item.id, Math.max(1, item.quantity - 1))}
        >
          <Minus size={16} />
        </Button>
        <span className="w-8 text-center">{item.quantity}</span>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
        >
          <Plus size={16} />
        </Button>
      </div>

      <button
        onClick={() => onRemove(item.id)}
        className="text-red-400 hover:text-red-300"
        aria-label={`Eliminar ${item.name}`}
      >
        <Trash2 size={16} />
      </button>
    </div>
  );
}
