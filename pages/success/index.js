import { useEffect } from "react";
import { useRouter } from "next/router";
import { createClient } from "@supabase/supabase-js";

const supabaseURL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

const supabase = createClient(supabaseURL, supabaseAnonKey);

export default function OrderSuccess() {
  const router = useRouter();

  useEffect(() => {
    const { session_id } = router.query;

    if (session_id) {
      fetch("/api/fulfill_order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ session_id }),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log("order fulfillment res:", data);
          if (data.success && data.order) {
            sendToShipStation(data.order, data.orderItems);
          }
        })
        .catch((error) => console.error("Error in fulfillment API:", error));
    }
  }, [router.query]);
  //   try {
  //     const stripeSecretKey = process.env.STRIPE_SECRET_KEY;

  //     if (!stripeSecretKey) {
  //       throw new Error("Stripe key missing in env.")
  //     }

  //     const stripe = require("stripe")(stripeSecretKey);

  //     const checkoutSession = await stripe.checkout.sessions.retrieve(
  //       sessionId,
  //       {
  //         expand: ["line_items"],
  //       }
  //     );

  //     const { data: existingOrder, error: fetchError } = await supabase
  //       .from("orders")
  //       .select("id, status")
  //       .eq("session_id", sessionId)
  //       .single();
  //       if (fetchError) console.error("Error fetching an existing order:", fetchError);

  //     if (existingOrder && existingOrder.status === "fulfilled") {
  //       console.log("order already processed.");
  //       return;
  //     }

  //     if (checkoutSession.payment_status === "paid") {
  //       const totalAmount = checkoutSession.amount_total / 100;
  //       const customerDetails = checkoutSession.customer_details;

  //       const { data: newOrder, error: orderError } = await supabase
  //         .from("orders")
  //         .insert([
  //           {
  //             session_id: sessionId,
  //             customer_email: customerDetails.email,
  //             customer_name: customerDetails.name,
  //             shipping_address: JSON.stringify(customerDetails.address),
  //             total_amount: totalAmount,
  //             status: "awaiting_shipment",
  //           },
  //         ])
  //         .select()
  //         .single();

  //       if (orderError) {
  //         console.error("Error processing order:", orderError);
  //         return;
  //       }

  //       const orderId = newOrder.id;

  //       const lineItems = checkoutSession.line_items.data.map((item) => ({
  //         order_id: orderId,
  //         product_id: item.price.product,
  //         sku: item.price.id,
  //         product_name: item.product.name,
  //         quantity: item.quantity,
  //         price_each: item.price.unit_amount / 100,
  //         subtotal: (item.quantity * item.price.unit_amount) / 100,
  //       }));

  //       const { error: itemsError } = await supabase
  //         .from("order_items")
  //         .insert(lineItems);

  //       if (itemsError) {
  //         console.error("Error inserting order items:", itemsError);
  //         return;
  //       }

  //       await sendToShipStation(newOrder, lineItems);

  //       console.log("Order fulfilled and sent to ShipStation!", orderId);
  //     }
  //   } catch (error) {
  //     console.error("Error in fulfillOrder:", error);
  //   }
  // };

  const sendToShipStation = async (order, orderItems) => {
    try {
      const res = await fetch("/api/shipstation", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ order, orderItems }),
      });

      if (!res.ok) {
        throw new Error("Failed to send order data to ShipStation.");
      }
      console.log("Order sent to ShipStation successfully");
    } catch (error) {
      console.error("Error sending order details to ShipStation:", error);
    }
  };
  return (
    <div className="bg-gray">
      <div className="relative isolate px-6 pt-14 lg:px-8">
        <div
          aria-hidden="true"
          className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
        >
          <div
            style={{
              clipPath:
                "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
            }}
            className="relative left-[calc(50%-11rem)] aspect-1155/678 w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-linear-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
          />
        </div>
        <div className="mx-auto max-w-2xl py-32 sm:py-48 lg:py-56">
          <div className="hidden sm:mb-8 sm:flex sm:justify-center">
            <div className="relative rounded-full px-3 py-1 text-sm/6 text-gray-600 ring-1 ring-gray-900/10 hover:ring-gray-900/20">
              Got questions?{" "}
              <a href="/warranty" className="font-semibold text-indigo-600">
                <span aria-hidden="true" className="absolute inset-0" />
                Contact us <span aria-hidden="true">&rarr;</span>
              </a>
            </div>
          </div>
          <div className="text-center">
            <h1 className="text-4xl font-semibold tracking-tight text-balance text-gray-900 sm:text-7xl">
              Thank you for your order!
            </h1>
            <p className="mt-10 text-lg font-medium text-pretty text-gray-500 sm:text-xl/8">
              You will receive an email confirmation.
            </p>
          </div>
        </div>
      </div>
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]"
      >
        <div
          style={{
            clipPath:
              "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
          }}
          className="relative left-[calc(50%+3rem)] aspect-1155/678 w-[36.125rem] -translate-x-1/2 bg-linear-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]"
        />
      </div>
    </div>
  );
}
