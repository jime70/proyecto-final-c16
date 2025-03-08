// ./src/context/User/UserState.js
import { useReducer } from "react";

import ClientReducer from "./ClientReducer";
import ClientContext from "./ClientContext";
import axiosClient from "../../config/axios";
import getToken from "../../config/token";
import clienteAxios from "../../config/axios";

const ClientState = (props) => {
  const initialState = {
    currentClient: {
      name: "",
      lastname: "",
      country: "",
      address: "",
      email: "",
      receipts: [],
      zipcode: 0,
    },
    cart: [],
    authStatus: false,
    globalLoading: false,
    sessionURL: null,
  };

  const [globalState, dispatch] = useReducer(ClientReducer, initialState);

  const registerClient = async (form) => {
    try {
      const res = await clienteAxios.post("/clients/register", form);
      const token = res.data.data;

      dispatch({
        type: "REGISTRO_EXITOSO",
        payload: token,
      });

      return;
    } catch (error) {
      console.log(error);
      return error.response.data.msg;
    }
  };

  const loginClient = async (form) => {
    try {
      const res = await clienteAxios.post("/clients/client-login", form);

      const token = res.data.data;

      dispatch({
        type: "LOGIN_EXITOSO",
        payload: token,
      });

      return;
    } catch (error) {
      return error.response.data.msg;
    }
  };

  const verifyingToken = async () => {
    getToken();

    try {
      const res = await clienteAxios.get("/clients/verifytoken");

      const clientData = res.data.data;

      dispatch({
        type: "GET_DATA_USER",
        payload: clientData,
      });
    } catch (error) {
      return;
    }
  };

  const logoutClient = async () => {
    dispatch({
      type: "LOGOUT_USUARIO",
    });
  };

  const editCart = async (data) => {
    getToken();

    try {
      const res = await clienteAxios.put("/checkout/edit-cart", {
        products: data,
      });

      await getCart();

      return res.data.msg;
    } catch (error) {
      return;
    }
  };

  const getCart = async () => {
    getToken();

    try {
      const res = await clienteAxios.get("/checkout/get-cart");

      dispatch({
        type: "GET_CART",
        payload: res.data.cart.products,
      });
    } catch (error) {
      return;
    }
  };

  const setLoading = (status) => {
    dispatch({
      type: "CHANGE_STATUS_LOADING",
      dispatch: status,
    });
  };

  const getCheckoutSession = async () => {
    getToken();

    const res = await clienteAxios.get("checkout/create-checkout-session");

    dispatch({
      type: "GET_CHECKOUT_SESSION",
      payload: res.data.session_url,
    });
  };

  const clientSubmitForm = async (dataform) => {
    getToken();

    await axiosClient.put("clients/update", dataform);
  };

  // 4. RETORNO
  return (
    <ClientContext.Provider
      value={{
        currentClientr: globalState.currentClient,
        cart: globalState.cart,
        authStatus: globalState.authStatus,
        globalLoading: globalState.globalLoading,
        sessionURL: globalState.sessionURL,
        registerClient,
        loginClient,
        verifyingToken,
        logoutClient,
        editCart,
        getCart,
        setLoading,
        getCheckoutSession,
        clientSubmitForm,
      }}
    >
      {props.children}
    </ClientContext.Provider>
  );
};

export default ClientState;