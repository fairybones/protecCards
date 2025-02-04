import React, { useContext, useEffect, useState } from "react";
import { CartContext } from "context/CartContext";
import Link from "next/link";

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
  const SUPABASE_URL = "https://lqgkaiftunbbvlkylfga.supabase.co";

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
    <div class="font-sans md:max-w-4xl max-md:max-w-xl mx-auto bg-white py-4">
      <div class="grid md:grid-cols-3 gap-4">
        <div class="md:col-span-2 p-4 rounded-md">
          <h2 class="text-2xl font-bold text-gray-800">
            {customerCart?.cartItems.length || 0} Items in Cart!
          </h2>
          <hr class="border-gray-300 mt-4 mb-8" />

          <div class="space-y-4">
            <div class="grid grid-cols-3 items-center gap-4">
              <div class="col-span-2 flex items-center gap-4"></div>
            </div>
            {customerCart?.cartItems?.map((cartItem) => (
              <div class="grid grid-cols-3 items-center gap-4">
                <div class="col-span-2 flex items-center gap-4">
                  <div class="w-24 h-24 shrink-0 bg-white p-2 rounded-md">
                    <img
                      src={
                        cartItem.image ||
                        `${SUPABASE_URL}/storage/v1/object/public/product-pix/${cartItem.id}.png`
                      }
                      class="w-full h-full object-contain"
                    />
                  </div>

                  <div>
                    <h3 class="text-base font-bold text-gray-800">
                      {cartItem.name}
                    </h3>

                    <div class="flex items-center gap-x-6 mt-4">
                      <div class="relative group">
                        <button
                          type="button"
                          class="flex items-center px-2.5 py-1.5 border border-gray-300 text-gray-800 text-xs outline-none bg-transparent rounded-md"
                        >
                          STYLE
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            class="w-2.5 fill-gray-500 inline ml-2.5"
                            viewBox="0 0 24 24"
                          >
                            <path
                              fill-rule="evenodd"
                              d="M11.99997 18.1669a2.38 2.38 0 0 1-1.68266-.69733l-9.52-9.52a2.38 2.38 0 1 1 3.36532-3.36532l7.83734 7.83734 7.83734-7.83734a2.38 2.38 0 1 1 3.36532 3.36532l-9.52 9.52a2.38 2.38 0 0 1-1.68266.69734z"
                              clip-rule="evenodd"
                              data-original="#000000"
                            />
                          </svg>
                        </button>

                        <ul class="group-hover:block hidden absolute rounded-md min-w-[80px] shadow-lg bg-white z-[1000]">
                          <li class="py-2 px-4 hover:bg-gray-100 text-gray-800 text-xs cursor-pointer">
                            SM
                          </li>
                          <li class="py-2 px-4 hover:bg-gray-100 text-gray-800 text-xs cursor-pointer">
                            MD
                          </li>
                          <li class="py-2 px-4 hover:bg-gray-100 text-gray-800 text-xs cursor-pointer">
                            XL
                          </li>
                          <li class="py-2 px-4 hover:bg-gray-100 text-gray-800 text-xs cursor-pointer">
                            XXL
                          </li>
                        </ul>
                        <button
                          class="text-xs text-red-500 cursor-pointer mt-1"
                          onClick={() => deleteItemFromCart(cartItem)}
                        >
                          Remove
                        </button>
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => decreaseQty(cartItem)}
                          class="flex items-center justify-center h-8 w-8 border border-gray-300 text-gray-800 text-xs outline-none bg-transparent rounded-md"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            class="w-2.5 fill-current"
                            viewBox="0 0 124 124"
                          >
                            <path
                              d="M112 50H12C5.4 50 0 55.4 0 62s5.4 12 12 12h100c6.6 0 12-5.4 12-12s-5.4-12-12-12z"
                              data-original="#000000"
                            ></path>
                          </svg>
                        </button>
                        <span class="h-8 flex items-center justify-center text-sm font-medium px-2">
                          {cartItem.quantity}
                        </span>
                        <button
                          type="button"
                          onClick={() => increaseQty(cartItem)}
                          class="flex items-center justify-center h-8 w-8 border border-gray-300 text-gray-800 text-xs outline-none bg-transparent rounded-md"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            class="w-2.5 fill-current"
                            viewBox="0 0 42 42"
                          >
                            <path
                              d="M37.059 16H26V4.941C26 2.224 23.718 0 21 0s-5 2.224-5 4.941V16H4.941C2.224 16 0 18.282 0 21s2.224 5 4.941 5H16v11.059C16 39.776 18.282 42 21 42s5-2.224 5-4.941V26h11.059C39.776 26 42 23.718 42 21s-2.224-5-4.941-5z"
                              data-original="#000000"
                            ></path>
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="ml-auto">
                  <h4 class="text-base font-bold text-gray-800 ml-auto">
                    ${cartItem.price}
                  </h4>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div class="rounded-md p-4 md:sticky top-0">
          <div class="flex border border-emerald-600 overflow-hidden rounded-md">
            <input
              type="email"
              placeholder="Promo code"
              class="w-full outline-none bg-white text-gray-600 text-sm px-4 py-2.5"
            />
            <button
              type="button"
              class="flex items-center justify-center font-semibold tracking-wide bg-yellow-600 hover:bg-yellow-500 px-4 text-sm text-white"
            >
              Apply
            </button>
          </div>
          {/* ORDER SUMMARY */}
          <ul class="text-gray-800 mt-8 space-y-4">
            <li class="flex flex-wrap gap-4 text-base">
              Subtotal <span class="ml-auto">${subtotal}</span>
            </li>
            <li class="flex flex-wrap gap-4 text-base">
              Total Units{" "}
              <span class="ml-auto">
                {customerCart?.cartItems?.reduce(
                  (acc, item) => acc + item.quantity,
                  0
                )}
              </span>
            </li>
            <li class="flex flex-wrap gap-4 text-base">
              Estimated Tax <span class="ml-auto">${taxAmount}</span>
            </li>
            <li class="flex flex-wrap gap-4 text-base font-bold">
              Total <span class="ml-auto">${total}</span>
            </li>
          </ul>

          <div class="mt-8 space-y-2">
            <p className="text-xs text-gray-700 mb-2">
              * Shipping is calculated at checkout.
            </p>
            <button
              type="button"
              class="text-sm px-4 py-2.5 w-full font-semibold tracking-wide bg-yellow-600 hover:bg-yellow-500 text-white rounded-md"
              onClick={() => handleCheckout(customerCart?.cartItems)}
              disabled={customerCart?.cartItems?.length === 0}
            >
              Checkout
            </button>
            {customerCart?.cartItems?.length === 0 && (
              <Link href="/" className="text-md hover:underline items-center mt-2">Continue Shopping{" "}</Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

{
  /* <img
            alt={"ProTec Logo"}
            src={
              "https://lqgkaiftunbbvlkylfga.supabase.co/storage/v1/object/public/product-pix/hero.png"
            }
            className="w-full max-w-xs sm:max-w-md md:max-w-lg lg:max-w-screen-lg"
          /> */
}

export default Cart;
