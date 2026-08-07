import { NextResponse } from "next/server";

const Stripe = require("stripe");

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const stripeSecretKey = process.env.STRIPE_SECRET_KEY;

    if (!stripeSecretKey) {
      return NextResponse.json(
        { error: "STRIPE_SECRET_KEY is not configured" },
        { status: 500 }
      );
    }

    const stripe = new Stripe(stripeSecretKey, {
      apiVersion: "2024-06-20"
    });

    const orderData = body.order || {
      id: `order_${Date.now()}`,
      total: 10000,
      currency: "MXN"
    };

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: (orderData.currency || "mxn").toLowerCase(),
            product_data: {
              name: "Productos Temozonia"
            },
            unit_amount: orderData.total
          },
          quantity: 1
        }
      ],
      mode: "payment",
      success_url: `${process.env.APP_URL}/es/order/${orderData.id}`,
      cancel_url: `${process.env.APP_URL}/es/checkout`
    });

    return NextResponse.json({
      success: true,
      sessionId: session.id,
      url: session.url
    });
  } catch (error: any) {
    console.error("Stripe create-checkout error:", error);
    return NextResponse.json(
      { error: error.message },
      { status: error.statusCode || 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json({ status: "ok", endpoint: "stripe/create-checkout" });
}
