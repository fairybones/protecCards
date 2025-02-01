import React, { useContext, useEffect, useState } from "react";
import { CartContext } from "context/CartContext";
import Link from "next/link";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
);

const handleCheckout = async (cart) => {
  const res = await fetch("/api/checkout_sessions", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ cartItems: cart }),
  });
  if (!res.ok) {
    const errorData = await res.json();
    console.error("Checkout session failed:", errorData);
    return;
  }
  const data = await res.json();
  if (data.url) {
    window.location.href = data.url;
  } else {
    console.error("Checkout error:", error);
  }
  // const { sessionId } = await res.json();
  // const stripe = await stripePromise;
  // stripe.redirectToCheckout({ sessionId });
};

const Cart = () => {
  const { addItemToCart, deleteItemFromCart, cart } = useContext(CartContext);
  const [customerCart, setCustomerCart] = useState(null);

  // ensure cart is only used after hydration
  useEffect(() => {
    setCustomerCart(cart);
  }, [cart]);

  if (!customerCart) {
    return <p>Loading...</p>;
  }

  const increaseQty = (cartItem) => {
    const newQty = cartItem?.quantity + 1;
    const item = { ...cartItem, quantity: newQty };

    addItemToCart(item);
  };
  const decreaseQty = (cartItem) => {
    if (cartItem?.quantity > 1) {
      const newQty = cartItem?.quantity - 1;
      const item = { ...cartItem, quantity: newQty };

      addItemToCart(item);
    } else {
      deleteItemFromCart(cartItem.product);
    }
  };
  const findSubtotal = (cartItems) => {
    if (!cartItems || cartItems.length === 0) return 0;
    return cartItems
      .reduce((acc, item) => acc + item.quantity * item.price, 0)
      .toFixed(2);
  };
  const subtotal = findSubtotal(customerCart?.cartItems);

  const taxAmount = (subtotal * 0.15).toFixed(2);
  const total = (Number(subtotal) + Number(taxAmount)).toFixed(2);

  return (
    <div>
      <section className="py-5 sm:py-7">
        <h2 className="text-xl font-semiold mb-2">
          {customerCart?.cartItems.length || 0} Items in Cart!
        </h2>
      </section>
      <img
        alt={"ProTec Logo"}
        src={
          "https://lqgkaiftunbbvlkylfga.supabase.co/storage/v1/object/public/product-photos/hero.png"
        }
        className="w-full max-w-xs sm:max-w-md md:max-w-lg lg:max-w-screen-lg"
      />
      {customerCart?.cartItems?.length > 0 && (
        <section className="py-6">
          <div className="container mx-auto px-4 max-w-screen-xl">
            <div className="flex flex-col md:flex-row gap-6">
              <main className="md:w-3/4 h-full">
                <article className="border border-gray-200 bg-white shadow-sm rounded-lg mb-5p-5 max-h-full">
                  {customerCart?.cartItems?.map((cartItem) => (
                    <div
                      key={cartItem.product}
                      className="flex flex-wrap mt-5 ml-5 items-center gap-6 border-b pb-6"
                    >
                      <div className="flex flex-wrap lg:flex-row gap-5 mb-6">
                        <div className="w-full lg:w-1/4">
                          <figure className="flex leading-5">
                            <div className="w-full lg:w-1/4">
                              <div className="w-24 h-24 rounded border border-gray-200 overflow-hidden mb-2">
                                {/* <img src={cartItem.image} alt={cartItem.name} className="w-full h-full object-cover"/> */}
                              </div>
                            </div>
                            <figcaption className="flex-1 min-w-0 ml-20">
                              <p className="text-lg font-medium text-gray-800">
                                <Link
                                  href={`/${cartItem.product}`}
                                  className="hover:text-emerald-600"
                                >
                                  {cartItem.name}
                                </Link>
                              </p>
                              <p className="text-gray-600 mt-3">
                                Price: ${cartItem.price.toFixed(2)}
                              </p>
                            </figcaption>
                          </figure>
                        </div>
                        <div className="w-24">
                          <div className="flex items-center ml-20">
                            <button
                              data-action="decrement"
                              className="bg-gray-100 text-gray-600 px-3 py-1 rounded-l-md hover:bg-gray-400 transition"
                              onClick={() => decreaseQty(cartItem)}
                            >
                              <span className="m-auto text-2xl font-thin">
                                -
                              </span>
                            </button>
                            <input
                              type="number"
                              className="w-12 text-center bg-gray-100 font-semibold text-md  md:text-basecursor-default flex items-center text-gray-900 custom-input-number"
                              name="custom-input-number"
                              value={cartItem.quantity}
                              readOnly
                            ></input>
                            <button
                              data-action="increment"
                              className="bg-gray-100 text-gray-600 px-3 py-1 rounded-md hover:bg-gray-400 transition"
                              onClick={() => increaseQty(cartItem)}
                            >
                              <span className="m-auto text-2xl font-thin">
                                +
                              </span>
                            </button>
                          </div>
                        </div>
                        <div className="ml-auto">
                          <div className="float-right">
                            <a
                              className="bg-gray-100 text-gray-600 text-sm px-3 py-1 rounded-md hover:bg-gray-400 transition"
                              onClick={() =>
                                deleteItemFromCart(cartItem?.product)
                              }
                            >
                              Remove
                            </a>
                          </div>
                        </div>
                      </div>
                      <hr className="my-4" />
                    </div>
                  ))}
                </article>
              </main>
              <aside className="md:w-1/4 h-full">
                <article className="border border-gray-200 bg-white shadow-sm rounded-lg mb-5 p-5">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">
                    Order Summary
                  </h3>
                  <ul className="text-gray-700 space-y-2">
                    <li className="flex justify-between mb-1">
                      <span>Subtotal:</span>
                      <span className="font-semibold">${subtotal}</span>
                    </li>
                    <li className="flex justify-between mb-1">
                      <span>Total Units:</span>
                      <span className="text-emerald-700">
                        {customerCart?.cartItems?.reduce(
                          (acc, item) => acc + item.quantity,
                          0
                        )}
                      </span>
                    </li>
                    <li className="flex justify-between mb-1">
                      <span>Estimated Tax:</span>
                      <span className="font-semibold">${taxAmount}</span>
                    </li>
                    <li className="flex justify-between text-lg font-semibold mb-1">
                      <span>Total:</span>
                      <span>${total}</span>
                    </li>
                  </ul>
                  <p className="text-xs text-gray-700 mt-2 mb-1">
                    *Shipping calculated at checkout.
                  </p>
                  <button
                    className="w-full mt-4 bg-emerald-600 text-white py-2 rounded-lg hover:bg-emerald-700 transition"
                    onClick={() => handleCheckout(customerCart?.cartItems)}
                    disabled={customerCart?.cartItems?.length === 0}
                  >
                    Proceed to Checkout
                  </button>
                  {cart?.cartItems?.length === 0 && (
                    <div className="text-center py-10">
                      <h2 className="text-2xl font-semibold mb-4">
                        Your cart is empty.
                      </h2>
                      <Link
                        href="https://protecaccessories.com/"
                        className="text-emerald-700 hover:underline"
                      >
                        Continue Shopping
                      </Link>
                    </div>
                  )}
                </article>
              </aside>
            </div>
          </div>
        </section>
      )}
      {customerCart?.cartItems?.length === 0 && (
        <div className="text-center py-10">
          <h2 className="text-2xl font-semibold mb-4">Your cart is empty.</h2>
          <Link href="/" className="text-emerald-700 hover:underline">
            Continue Shopping
          </Link>
        </div>
      )}
    </div>
  );
};

export default Cart;
