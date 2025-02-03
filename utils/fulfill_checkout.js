const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

async function fulfillCheckout(sessionId) {
    
    console.log("Checkout session:", sessionId);

    // make this function safe to run multiple times with the same session ID

    // make sure fulfillment hasn't already been performed for this checkout session

    // retrieve the session from the API checkout_sessions with line_items
    const checkoutSession = await stripe.checkout.sessions.retrieve(sessionId, {
        expand: ["line_items"],
    });

    if (checkoutSession.payment_status !== "unpaid") {
        // perform fulfillment of the line items

        // record/save fulfillment status for this checkout session
    }
}