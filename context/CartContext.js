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
                };
            } else {
                return {
                    ...state,
                    cartItems: [...state.cartItems, { ...newProduct, quantity: 1 }],
                };
            }
        case "REMOVE_FROM_CART":
            return {
                ...state,
                cartItems: state.cartItems.filter((product) => product.id !== action.payload),
            };
        case "CLEAR_CART":
            return cartState;

        default:
            return state;
    }
};

export const CartContext = createContext();

// provider to wrap app
export const CartProvider = ({ children }) => {
    const [state, dispatch] = useReducer(cartReducer, cartState);

    // store cart with localStorage
    useEffect(() => {
        const cartData = localStorage.getItem("cart");
        if (cartData) {
            dispatch({ type: "INITIALIZE_CART", payload: JSON.parse(cartData) });
        }
    }, []);
    // sync cart state to localStorage
    useEffect(() => {
        localStorage.setItem("cart", JSON.stringify(state.cartItems));
    }, [state.cartItems]);

    return (
        <CartContext.Provider value={{ cartItems: state.cartItems, dispatch }}>
            {children}
        </CartContext.Provider>
    );
};