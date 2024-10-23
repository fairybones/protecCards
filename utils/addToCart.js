import { useContext } from "react";
import { CartContext } from "context/CartContext";

export default function addToCart(product) {
  const { cartItems, dispatch } = useContext(CartContext);

  const existingItem = cartItems.find((product) => product.id);

  if (existingItem) {
    dispatch({
      type: "UPDATE_CART_ITEM",
      payload: { ...existingItem, quantity: existingItem + 1 },
    });
  } else {
    dispatch({
      type: "ADD_TO_CART",
      payload: { ...product, quantity: 1 },
    });
  }
  console.log(`Added product ${id} to cart`);
}
