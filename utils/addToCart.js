export default function addToCart(product, cartItems, dispatch) {
  const existingItem = cartItems.find((item) => item.id === product.id);

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
  console.log(`Added product ${product.id} to cart`);
}
