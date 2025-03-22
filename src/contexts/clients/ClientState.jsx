import React, { useReducer } from "react";
import clienteAxios from "../../config/axios";
import ClientReducer from "./ClientReducer";
import ClientContext from "./ClientContext";

const ClientState = (props) => {
  const initialState = {
    client: {
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
      const res = await clienteAxios.post(
        "http://localhost:3003/api/clients/register",
        dataForm
      );
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
      const res = await clienteAxios.post(
        "http://localhost:3003/api/clients/client-login",
        dataForm
      );
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
        return {
          error: "Error al verificar la sesión. Inicia sesión nuevamente.",
        };
      }
      dispatch({
        type: "LOGIN_EXITOSO",
        payload: token,
      });

      return { success: true, token };
    } catch (error) {
      console.error("❌ Error en login:", error.response?.data || error);
      return { error: error.response?.data?.message || "Error en el servidor" };
    }
  };

  const verifyingToken = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      console.warn("No hay token en localStorage, cerrando sesión...");
      logout();
      return { error: "No hay token, inicia sesión nuevamente." };
    }
    clienteAxios.defaults.headers.common["x-auth-token"] = token;
    try {
      console.log("🔍 Verificando token con el backend...");
      const res = await clienteAxios.get(
        "http://localhost:3003/api/clients/verifytoken"
      );
      console.log("✅ Respuesta del backend:", res.data);

      const clientData = res.data.data; 

      if (!clientData) {
        console.error("❌ No se recibió información del cliente.");
        logout();
        return { error: "Error al obtener datos del usuario." };
      }
      dispatch({
        type: "OBTENER_CLIENTE",
        payload: clientData,
      });
      return { success: true };
    } catch (error) {
      console.error(
        "❌ Error en la verificación del token:",
        error.response?.data || error
      );
      logout();
      return { error: "Sesión no válida, inicia sesión nuevamente." };
    }
  };

  const clientSubmitForm = async (clientData) => {
    if (!clientData._id) {
      console.error("❌ Error: No hay ID en clientData.");
      return;
    }
  
    try {
      const res = await clienteAxios.put(`/clients/update/${clientData._id}`, clientData);
      console.log("Cliente actualizado:", res.data);
  
      dispatch({
        type: "OBTENER_CLIENTE",
        payload: res.data.updatedClient, 
      });
  
      return { success: true };
    } catch (error) {
      console.error("Error actualizando cliente:", error.response?.data || error);
      return { error: error.response?.data?.message || "Error en el servidor" };
    }
  };
  
  const getClientData = async () => {
    try {
      console.log("📥 Obteniendo datos del cliente...");
      const res = await clienteAxios.get("/clients/verifytoken");
  
      if (!res.data.client) {
        console.error("❌ Error: La API no devolvió datos del cliente.");
        return;
      }
  
      console.log("✅ Datos del cliente obtenidos:", res.data.client);
  
      dispatch({
        type: "OBTENER_CLIENTE",
        payload: res.data.client, 
      });
  
      return res.data.client;
    } catch (error) {
      console.error("❌ Error obteniendo cliente:", error.response?.data || error);
      return { error: "No se pudo obtener la información del cliente." };
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
        clientSubmitForm,
        loginClient,
        getClientData,
        logout,
      }}
    >
      {props.children}
    </ClientContext.Provider>
  );
};

export default ClientState;
