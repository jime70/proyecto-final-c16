import React, { useReducer } from "react";
import clienteAxios from "../../config/axios";
import ClientReducer from "./ClientReducer";
import ClientContext from "./ClientContext";

const ClientState = (props) => {
  const initialState = {
    currentUser: {
      name: "",
      lastname: "",
      country: "",
      address: "",
      email: "",
      zipcode: 0,
    }, 
  };

  const [globalState, dispatch] = useReducer(ClientReducer, initialState);

  const registerClient = async (dataForm) => {
    try {
      console.log("Registrando cliente con:", dataForm);

      const res = await clienteAxios.post("http://localhost:3003/api/clients/register", dataForm);
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

  const loginClient = async (dataForm) => {
    console.log("Intentando login con:", dataForm);

    try {
      const res = await clienteAxios.post("http://localhost:3003/api/clients/client-login", dataForm);
      console.log("Respuesta del login:", res.data);

      const token = res.data.token;
      if (!token) {
        console.error("No se recibió token desde el backend.");
        return { error: "No se pudo autenticar. Intenta nuevamente." };
      }

      localStorage.setItem("token", token);
      clienteAxios.defaults.headers.common["x-auth-token"] = token;
      console.log("Token guardado en localStorage:", token);

      const verifyResponse = await verifyingToken();

      if (verifyResponse?.error) {
        return { error: "Error al verificar la sesión. Inicia sesión nuevamente." };
      }

      dispatch({
        type: "LOGIN_EXITOSO",
        payload: token,
      });

      return { success: true };
    } catch (error) {
      console.error("❌ Error en login:", error.response?.data || error);
      return { error: error.response?.data?.message || "Error en el servidor" };
    }
  };

  const verifyingToken = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      console.warn("No hay token en localStorage, no se puede verificar.");
      logout();
      return { error: "No hay token, inicia sesión nuevamente." };
    }

    clienteAxios.defaults.headers.common["x-auth-token"] = token;

    try {
      console.log("🔍 Verificando token con el backend...");
      const res = await clienteAxios.get("http://localhost:3003/api/clients/verifytoken");
      const clientData = res.data.client;
      console.log("Cliente verificado:", res.data.client);

      dispatch({
        type: "OBTENER_CLIENTE",
        payload: clientData,
      });

      return { success: true };
    } catch (error) {
      console.error(" Error en la verificación de token:", error.response?.data || error);
      logout();
      return { error: "Sesión no válida, inicia sesión nuevamente." };
    }
  };

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
