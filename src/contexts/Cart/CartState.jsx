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
  const addToCart = (article) => {
    dispatch({ type: "ADD_TO_CART", payload: article });
  };

  // 📌 Eliminar producto del carrito
  const removeFromCart = (id) => {
    dispatch({ type: "REMOVE_FROM_CART", payload: id });
  };

  // 📌 Vaciar el carrito
  const clearCart = () => {
    dispatch({ type: "CLEAR_CART" });
  };

  return (
    <CartContext.Provider value={{ 
      cart: state.cart, 
      total: state.total, 
      addToCart, 
      removeFromCart,
      clearCart,
    }}>
      {children}
    </CartContext.Provider>
  );
};

export default CartState;
