import { useReducer, useEffect } from "react";
import CartContext from "./CartContext";
import CartReducer from "./CartReducer";

const CartState = ({ children }) => {
  const initialState = {
    cart: JSON.parse(localStorage.getItem("cart")) || [],
    total: 0,
  };

  const [state, dispatch] = useReducer(CartReducer, initialState);

  // 📌 Calcular el total cada vez que el carrito cambia
  useEffect(() => {
    const newTotal = state.cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    dispatch({ type: "CALCULATE_TOTAL", payload: newTotal });
    localStorage.setItem("cart", JSON.stringify(state.cart));
  }, [state.cart]);

  // 📌 Agregar producto al carrito
  const addToCart = (product) => {
    dispatch({ type: "ADD_TO_CART", payload: product });
  };

  // 📌 Eliminar producto del carrito
  const removeFromCart = (id) => {
    dispatch({ type: "REMOVE_FROM_CART", payload: id });
  };

  return (
    <CartContext.Provider value={{ 
      cart: state.cart, 
      total: state.total, 
      addToCart, 
      removeFromCart 
    }}>
      {children}
    </CartContext.Provider>
  );
};

export default CartState;
