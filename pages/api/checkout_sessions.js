import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: "2024-12-18.acacia",
});

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      const { cartItems } = req.body;
      console.log(cartItems);

      const line_items = cartItems.map((item) => ({
        price_data: {
          currency: "usd",
          product_data: {
            name: item.name,
          },
          unit_amount: Math.round(item.price * 100),
        },
        quantity: item.quantity,
      }));

      const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        line_items,
        mode: "payment",
        success_url: `${process.env.NEXT_PUBLIC_SITE_URL}/success`,
        cancel_url: `${process.env.NEXT_PUBLIC_SITE_URL}/cart`,
        automatic_tax: { enabled: true },
      });
      const sessionId = session.id;
      res.status(200).json({ url: session.url });
    } catch (err) {
        console.error("Stripe Checkout error:", err);
      res.status(err.statusCode || 500).json(err.message);
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end("Method Not Allowed");
    console.log("request recieved!", req.body);
  }
}
