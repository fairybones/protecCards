"use client";
import { createContext, useState, useEffect } from "react";

export const CartContext = createContext();

// provider to wrap app
export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    setCartToState();
  }, []);

  const setCartToState = () => {
    try {
        setCart(
            localStorage.getItem("cart")
              ? JSON.parse(localStorage.getItem("cart"))
              : []
          );
    } catch (error) {
        console.error("Error accessing localStorage:", error);
        setCart([]);
    }
  };
  const addItemToCart = async ({
    product,
    id,
    name,
    price,
    bundle_size,
    color,
    image_src,
    quantity = 1,
  }) => {
    const item = {
      product,
      id,
      name,
      price,
      bundle_size,
      color,
      image_src,
      quantity,
    };
    const isItemExist = cart?.cartItems?.find(
      (i) => i.product === item.product
    );
    let newCartItems;

    if (isItemExist) {
      newCartItems = cart?.cartItems?.map((i) =>
        i.product === isItemExist.product ? item : i
      );
    } else {
      newCartItems = [...(cart?.cartItems || []), item];
    }
    localStorage.setItem("cart", JSON.stringify({ cartItems: newCartItems }));
    setCartToState();
  };

  const deleteItemFromCart = (id) => {
    const newCartItems = cart?.cartItems?.filter((i) => i.product !== id);

    localStorage.setItem("cart", JSON.stringify({ cartItems: newCartItems }));
    setCartToState();
  };

  return (
    <CartContext.Provider value={{ cart, addItemToCart, deleteItemFromCart }}>
      {children}
    </CartContext.Provider>
  );
};

export default CartContext;
