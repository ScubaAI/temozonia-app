import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { createInvoice } from "@/services/btcpay.service";
import { createPreference } from "@/services/mercadopago.service";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const {
      locale,
      items,
      subtotal,
      deliveryFee,
      total,
      currency,
      customer,
      delivery,
      payment,
    } = body;

    // 1. Crear la orden en la base de datos con estado "pending"
    const newOrder = await prisma.order.create({
      data: {
        locale,
        subtotal,
        deliveryFee,
        total,
        currency,
        customerName: customer.name,
        customerEmail: customer.email,
        customerPhone: customer.phone,
        customerAddress: customer.address,
        paymentMethod: payment.method,
        paymentStatus: "pending",
        deliveryZone: delivery.zone,
        deliveryEta: delivery.eta,
        deliveryAddress: delivery.address,
        items: {
          create: items.map((item: any) => ({
            productId: item.id,
            name: item.name,
            description: item.description,
            price: item.price,
            quantity: item.quantity,
            currency: item.currency,
            image: item.image,
          })),
        },
      },
      include: {
        items: true,
      },
    });

    // 2. Crear la factura o preferencia de pago según el método seleccionado
    const paymentMethod = payment.method;
    let paymentUrl: string | null = null;
    let providerOrderId: string | null = null;

    if (paymentMethod === "btc") {
      const invoice = await createInvoice({
        orderId: newOrder.id,
        price: String(newOrder.total / 100),
        currency: newOrder.currency,
        itemDesc: "Productos Temozonia",
        redirectURL: `${process.env.APP_URL}/${locale}/order/${newOrder.id}`,
        notificationURL: `${process.env.APP_URL}/api/webhook/btcpay`,
        buyerEmail: customer.email,
      });
      paymentUrl = invoice.url || invoice.redirect;
      providerOrderId = invoice.id;
    } else if (paymentMethod === "card") {
      const preference = await createPreference({
        items: items.map((item: any) => ({
          id: item.id,
          title: item.name,
          description: item.description,
          quantity: item.quantity,
          unit_price: item.price / 100,
          currency_id: item.currency || "MXN",
        })),
        payer: {
          email: customer.email,
          name: customer.name,
          phone: customer.phone,
          address: customer.address,
        },
        back_urls: {
          success: `${process.env.APP_URL}/${locale}/order/${newOrder.id}`,
          failure: `${process.env.APP_URL}/${locale}/checkout`,
          pending: `${process.env.APP_URL}/${locale}/order/${newOrder.id}`,
        },
        auto_return: "approved",
        external_reference: newOrder.id,
        webhook_url: `${process.env.APP_URL}/api/webhook/mercadopago`,
      });
      paymentUrl = preference.init_point;
      providerOrderId = preference.id;
    }

    await prisma.order.update({
      where: { id: newOrder.id },
      data: {
        invoiceId: providerOrderId,
        providerOrderId,
      },
    });

    return NextResponse.json(
      { 
        success: true, 
        orderId: newOrder.id,
        paymentUrl,
        paymentMethod,
        message: "Orden creada exitosamente. Redirigiendo a pago..." 
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("❌ Error creando orden:", error);
    return NextResponse.json(
      { success: false, error: "Error interno del servidor al crear la orden" },
      { status: 500 }
    );
  }
}
