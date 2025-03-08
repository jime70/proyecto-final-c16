import { useReducer } from "react";
import StoreReducer from "./StoreReducer";
import StoreContext from "./StoreContext";
import clienteAxios from "../../config/axios";

const StoreState = (props) => {
  const initialState = {
    cart: [],
    total: 0,
    sessionURL: ""
  };

  const [globalState, dispatch] = useReducer(StoreReducer, initialState);

  const addToCart = (article) => {
    const updatedCart = [...globalState.cart];
    const index = updatedCart.findIndex((item) => item._id === article._id);

    if (index >= 0) {
      updatedCart[index].quantity += 1;
    } else {
      updatedCart.push({ ...article, quantity: 1 });
    }

    dispatch({
      type: "UPDATE_CART",
      payload: { cart: updatedCart, total: calculateTotal(updatedCart) },
    });
  };

  const removeFromCart = (articleId) => {
    const updatedCart = globalState.cart.filter((item) => item._id !== articleId);
    dispatch({
      type: "UPDATE_CART",
      payload: { cart: updatedCart, total: calculateTotal(updatedCart) },
    });
  };

  const calculateTotal = (cart) => {
    return cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  };

  const createCheckoutSession = async () => {
    try {
      const res = await clienteAxios.post("/checkout/create-checkout-session", {
        cart: globalState.cart,
      });
      
      window.location.href = res.data.session_url;
    } catch (error) {
      console.error("Error al iniciar la sesión de pago:", error);
    }
  };

  return (
    <StoreContext.Provider
      value={{
        cart: globalState.cart,
        total: globalState.total,
        addToCart,
        removeFromCart,
        createCheckoutSession,
      }}
    >
      {props.children}
    </StoreContext.Provider>
  );
};

export default StoreState;
