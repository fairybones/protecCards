import { createContext, useReducer, useEffect } from "react";

const cartState = {
    cartItems: [],
};
// reducer to manage cart actions
const cartReducer = (state, action) => {
    switch (action.type) {
        case "ADD_TO_CART":
            const newProduct = action.payload;
            const existingItem = state.cartItems.find((product) => product.id === newProduct.id);

            if (existingItem) {
                return {
                    ...state,
                    cartItems: state.cartItems.map((product) => product.id === newProduct.id ? { ...product, quantity: product.quantity + 1 } : product),
                }
            }
    }
}