import { useReducer, useEffect } from "react";
import CartContext from "./CartContext";
import CartReducer from "./CartReducer";

const CartState = ({ children }) => {
  const initialState = {
    cart: JSON.parse(localStorage.getItem("cart")) || [],
    total: 0,
  };

  const [state, dispatch] = useReducer(CartReducer, initialState);
  

  const addToCart = (article) => {
    console.log("🛒 Agregando al carrito:", article);
    dispatch({ type: "ADD_TO_CART", payload: article });
  };

  const removeFromCart = (id) => {
    console.log("❌ Eliminando del carrito:", id);
    dispatch({ type: "REMOVE_FROM_CART", payload: id });
  };

  const clearCart = () => {
    dispatch({ type: "CLEAR_CART" });
  };

  useEffect(() => {
    console.log("📦 Carrito actualizado:", state.cart);
    localStorage.setItem("cart", JSON.stringify(state.cart));

    const newTotal = state.cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    dispatch({ type: "CALCULATE_TOTAL", payload: newTotal });
  }, [state.cart]);

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
