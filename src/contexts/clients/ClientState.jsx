import React, { useReducer } from "react";
import clienteAxios from "../../config/axios";
import ClientReducer from "./ClientReducer";
import ClientContext from "./ClientContext";

const ClientState = (props) => {
  const initialState = {
    client: null, 
    authStatus: false,
    loading: true,
  };

  const [globalState, dispatch] = useReducer(ClientReducer, initialState);

  const registerClient = async (dataForm) => {
    try {
      console.log("Datos enviados al backend para registro:", dataForm);
      
      const res = await clienteAxios.post("/clients/register", dataForm);
      console.log("Registro exitoso:", res.data);

      const token = res.data.token;
      if (token) {
        localStorage.setItem("token", token);
        clienteAxios.defaults.headers.common["x-auth-token"] = token;
        await verifyingToken(); 
      }

      dispatch({
        type: "REGISTRO_EXITOSO",
        payload: res.data,
      });

      return { success: true };
    } catch (error) {
      console.error("Error en el registro:", error.response?.data || error);
      return { error: error.response?.data?.message || "Error en el servidor" };
    }
  };

  const verifyingToken = async () => {
    const token = localStorage.getItem("token");

    if (token) {
      clienteAxios.defaults.headers.common["x-auth-token"] = token;
    } else {
      delete clienteAxios.defaults.headers.common["x-auth-token"];
    }

    try {
      const res = await clienteAxios.get("/clients/verify-client");
      console.log("Cliente verificado:", res.data);

      dispatch({
        type: "OBTENER_CLIENTE",
        payload: res.data.client,
      });

      return { success: true };
    } catch (error) {
      console.error("Error en la verificación de token:", error);
      logout(); 
      return { error: "Sesión no válida" };
    }
  };

  const loginClient = async (dataForm) => {
    console.log("Intentando login con:", dataForm);
    try {
      const res = await clienteAxios.post("/clients/client-login", dataForm);
      console.log("Respuesta del login:", res.data);

      const token = res.data.token;
      if (token) {
        localStorage.setItem("token", token);
        clienteAxios.defaults.headers.common["x-auth-token"] = token;
        await verifyingToken(); 
      }

      dispatch({
        type: "LOGIN_EXITOSO",
        payload: res.data,
      });

      return { success: true };
    } catch (error) {
      console.error("Error en login:", error.response?.data || error);
      return { error: error.response?.data?.message || "Error en el servidor" };
    }
  };

  // 🔹 CERRAR SESIÓN
  const logout = () => {
    console.log("Cerrando sesión...");
    localStorage.removeItem("token");
    delete clienteAxios.defaults.headers.common["x-auth-token"];

    dispatch({
      type: "CERRAR_SESION",
    });
  };

  return (
    <ClientContext.Provider
      value={{
        client: globalState.client,
        authStatus: globalState.authStatus,
        loading: globalState.loading,
        registerClient,
        verifyingToken,
        loginClient,
        logout,
      }}
    >
      {props.children}
    </ClientContext.Provider>
  );
};

export default ClientState;
