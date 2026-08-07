import { NextResponse } from "next/server";
import { createPreference } from "@/services/mercadopago.service";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const orderData = body.order || {
      id: `order_${Date.now()}`,
      total: 10000,
      currency: "MXN"
    };

    const payer = body.payer || {
      email: body.email || "cliente@temozonia.com",
      name: body.name || "Cliente"
    };

    const preference = await createPreference({
      items: [
        {
          id: orderData.id,
          title: "Productos Temozonia",
          description: "Orden de la tienda Temozonia",
          quantity: 1,
          unit_price: orderData.total / 100,
          currency_id: orderData.currency || "MXN"
        }
      ],
      payer,
      back_urls: {
        success: `${process.env.APP_URL}/es/order/${orderData.id}`,
        failure: `${process.env.APP_URL}/es/checkout`,
        pending: `${process.env.APP_URL}/es/order/${orderData.id}`
      },
      auto_return: "approved",
      external_reference: orderData.id,
      webhook_url: `${process.env.APP_URL}/api/webhook/mercadopago`
    });

    return NextResponse.json({
      success: true,
      preferenceId: preference.id,
      init_point: preference.init_point,
      sandbox_init_point: preference.sandbox_init_point
    });
  } catch (error: any) {
    console.error("MercadoPago create-preference error:", error);
    return NextResponse.json(
      { error: error.message },
      { status: error.statusCode || 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json({ status: "ok", endpoint: "mercadopago/create-preference" });
}
