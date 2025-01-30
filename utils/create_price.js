// import { createClient } from "@supabase/supabase-js";
// const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

// const supabase = createClient(
//   process.env.NEXT_PUBLIC_SUPABASE_URL,
//   process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
// );

// async function fetchPriceId(productId) {
//   const { data: product, error } = await supabase
//     .from("products")
//     .select("*")
//     .eq("id", productId)
//     .single();

//   if (error) {
//     throw new Error(`Failed to fetch product from Supabase: ${error.message}`);
//   }

//   if (product.stripe_price_id) {
//     return product.stripe_price_id;
//   }

//   const stripeProduct = await stripe.products.create({
//     name: product.name,
//     description: product.description,
//   });

//   const stripePrice = await stripe.prices.create({
//     unit_amount: product.price * 100,
//     currency: "usd",
//     product: stripeProduct.id,
//   });

//   // store the new PRICE_ID in supabase
//   const { error: updateError } = await supabase
//     .from("products")
//     .update({ stripe_price_id: stripePrice.id })
//     .eq("id", productId);

//   if (updateError) {
//     throw new Error(`Failed to update PRICE_ID: ${updateError}`);
//   }
//   return stripePrice.id;
// }
// const stripe = require('stripe')('sk_test_51QId7eBpJPrbg4swvY2FUhjYUunztswUVuV9L5a8CU5J4t70svBGRQ8Qyn40BaxTPpdkblfssn9dfr4da7CPLdvc00qKr8tonw');

// stripe.products.create({
//   name: 'Starter Subscription',
//   description: '$12/Month subscription',
// }).then(product => {
//   stripe.prices.create({
//     unit_amount: 1200,
//     currency: 'usd',
//     recurring: {
//       interval: 'month',
//     },
//     product: product.id,
//   }).then(price => {
//     console.log('Success! Here is your starter subscription product id: ' + product.id);
//     console.log('Success! Here is your starter subscription price id: ' + price.id);
//   });
// });
