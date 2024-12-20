import React from "react";
import dynamic from "next/dynamic";

const Cart = dynamic(() => import("components/Cart"), { ssr: false });

const CartPage = () => {
    return <Cart />;
};

export default CartPage;