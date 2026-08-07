import { NextResponse } from "next/server";
import { createInvoice } from "@/services/btcpay.service";

export async function POST(request: Request) {
  try {
    const body = await request.json().catch(() => ({}));

    const orderData = body.order || {
      id: `order_${Date.now()}`,
      total: 10000,
      currency: "MXN"
    };

    const invoice = await createInvoice({
      orderId: orderData.id,
      price: String(orderData.total / 100),
      currency: orderData.currency || "MXN",
      itemDesc: "Productos Temozonia",
      redirectURL: `${process.env.APP_URL}/es/order/${orderData.id}`,
      notificationURL: `${process.env.APP_URL}/api/webhook/btcpay`,
      buyerEmail: body.email
    });

    return NextResponse.json({
      success: true,
      invoiceId: invoice.id,
      redirectURL: invoice.url || invoice.redirect
    });
  } catch (error: any) {
    console.error("BTCPay create-invoice error:", error);
    return NextResponse.json(
      { error: error.message },
      { status: error.statusCode || 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json({ status: "ok", endpoint: "btcpay/create-invoice" });
}
