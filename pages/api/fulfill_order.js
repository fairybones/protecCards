import { createClient } from "@supabase/supabase-js";
import Stripe from "stripe";

const stripeSecretKey = process.env.STRIPE_SECRET_KEY;
if (!stripeSecretKey) {
    throw new Error("Stripe key missing in env.");
}
const stripe = new Stripe(stripeSecretKey);

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.SUPABASE_SERVICE_ROLE_KEY
);

export default async function handler(req, res) {
    if (req.method !== "POST") {
        return res.status(405).json({ error: "method not allowed" });
    }

    const { session_id } = req.body;
    if (!session_id) {
        return res.status(400).json({ error: "Missing sessionId" });
    }

    try {
        const checkoutSession = await stripe.checkout.sessions.retrieve(session_id, {
            expand: ["line_items"],
        });

        if (checkoutSession.payment_status !== "paid") {
            return res.status(400).json({ error: "Payment not completed" });
        }

        const { data: newOrder, error: orderError } = await supabase.from("orders").insert([{
            session_id,
            customer_email: checkoutSession.customer_details.email,
            customer_name: checkoutSession.customer_details.name,
            shipping_address: JSON.stringify(checkoutSession.customer_details.address),
            total_amount: checkoutSession.amount_total / 100,
            items: JSON.stringify(checkoutSession.line_items),
            status: "awaiting_shipment",
        },
    ]).select().single();

    if (orderError) {
        return res.status(500).json({ error: "Error processing order", details: orderError });
    }
    return res.status(200).json({ message: "Order fulfilled successfully", order: newOrder });
    } catch (error) {
        console.error("Error in fulfillOrder:", error);
        return res.status(500).json({ error: "Server error", details: error.message });
    }
}

