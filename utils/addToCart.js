import Cart from "pages/cart";

export default function addToCart({ id }) {
    const productToAdd = product.id === id;
    setCart ([...Cart, productToAdd ]);
    console.log(`Added product ${id} to cart`);
}