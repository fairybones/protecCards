"use client";

import React, { useContext } from "react";
import { CartContext } from "context/CartContext";
import Link from "next/link";

const Cart = () => {
  const { addItemToCart, deleteItemFromCart, cart } = useContext(CartContext);

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
    }
  };
  const subtotal = cart?.cartItems?.reduce(
    (acc, item) => acc + item.quantity * item.price,
    0
  );
  const taxAmount = (subtotal * 0.15).toFixed(2);
  const total = (Number(subtotal) + Number(taxAmount)).toFixed(2);

  return (
    <div>
      <section className="py-5 sm:py-7">
        <div className="container max-w-screen-xl mx-auto px-4">
          <h2 className="text-3xl font-semiold mb-2">
            {cart?.cartItems.length || 0} Items in Cart
          </h2>
        </div>
      </section>
      {cart?.cartItems?.length > 0 && (
        <section className="py-10">
          <div className="container max-w-screen-xl mx-auto px-4">
            <div className="flex flex-col md:flex-row gap-4">
              <main className="md:w-3/4">
                <article className="border border-gray-200 bg-white shadow-sm rounded mb-5 p-3 lg:p-5">
                  {cart?.cartItems?.map((cartItem) => (
                    <div key={cartItem.product}>
                      <div className="flex flex-wrap lg:flex-row gap-5 mb-4">
                        <div className="w-full lg:w-2/5 xl:w-2/4">
                          <figure className="flex leading-5">
                            <div>
                              <div className="block w-16 h-16 rounded border border-gray-200 overflow-hidden">
                                <img src={cartItem.image} alt={cartItem.name} />
                              </div>
                            </div>
                            <figcaption className="ml-3">
                              <p>
                                <a href="#" className="hover:text-emerald-600">
                                  {cartItem.name}
                                </a>
                              </p>
                            </figcaption>
                          </figure>
                        </div>
                        <div className="w-24">
                          <div className="flex flex-row h-10 w-full rounded-lg relative bg-transparent mt-1">
                            <button
                              data-action="decrement"
                              className="bg-gray-300 text-gray-600 hover:text-gray-700 hover:bg-gray-400 h-full w-20 rounded-l cursor-pointer outline-none"
                              onClick={() => decreaseQty(cartItem)}
                            >
                              <span className="m-auto text-2xl font-thin">
                                -
                              </span>
                            </button>
                            <input
                              type="number"
                              className="outline-none focus:outline-none text-center w-full bg-gray-300 font-semibold text-md hover:text-black focus:text-black  md:text-basecursor-default flex items-center text-gray-900 custom-input-number"
                              name="custom-input-number"
                              value={cartItem.quantity}
                              readOnly
                            ></input>
                            <button
                              data-action="increment"
                              className="bg-gray-300 text-gray-600 hover:text-gray-700 hover:bg-gray-400 h-full w-20 rounded-r cursor-pointer"
                              onClick={() => increaseQty(cartItem)}
                            >
                              <span className="m-auto text-2xl font-thin">
                                +
                              </span>
                            </button>
                          </div>
                        </div>
                        <div className="flex-auto">
                          <div className="float-right">
                            <a
                              className="px-4 py-2 inline-block text-red-600 bg-white shadow-sm border border-gray-200 rounded-md hover:bg-gray-100 cursor-pointer"
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
              <aside className="md:w-1/4">
                <article className="border border-gray-200 bg-white shadow-sm rounded mb-5 p-3 lg:p-5">
                  <ul className="mb-5">
                    <li className="flex justify-between text-gray-600 mb-1">
                      <span>Subtotal:</span>
                      <span>${subtotal}</span>
                    </li>
                    <li className="flex justify-between text-gray-600 mb-1">
                      <span>Total Units:</span>
                      <span className="text-emerald-700">
                        {cart?.cartItems?.reduce(
                            (acc, item) => acc + item.quantity,
                            0
                        )}
                      </span>
                    </li>
                    <li className="flex justify-between text-gray-600 mb-1">
                      <span>Estimated Tax:</span>
                      <span>${taxAmount}</span>
                    </li>
                    <li className="flex justify-between text-gray-600 mb-1">
                      <span>Total:</span>
                      <span>${total}</span>
                      <span className="text-xs text-gray-700 mb-1">*Shipping calculated at checkout.</span>
                    </li>
                  </ul>
                  {cart?.cartItems?.length === 0 && (
                    <div className="text-center py-10">
                      <h2 className="text-2xl font-semibold mb-4">Your cart is empty</h2>
                      <Link href="/" className="text-emerald-700 hover:underline">Continue Shopping</Link>
                    </div>
                  )}
                </article>
              </aside>
            </div>
          </div>
        </section>
      )}
    </div>
  );
};

export default Cart;
