// import React, { useReducer } from "react";
// import clienteAxios from "../../config/axios";
// import ClientReducer from "./ClientReducer";
// import ClientContext from "./ClientContext";

// const ClientState = (props) => {
//   const initialState = {
//     client: null, 
//     authStatus: false, 
//     loading: true, 
//   };

//   const [globalState, dispatch] = useReducer(ClientReducer, initialState);

//   const registerClient = async (dataForm) => {
//     try {
//       console.log("Registrando cliente con:", dataForm);

//       const res = await clienteAxios.post("http://localhost:3003/api/clients/register", dataForm);
//       console.log("Registro exitoso:", res.data);

//       const token = res.data.token;
//       if (token) {
//         localStorage.setItem("token", token);
//         clienteAxios.defaults.headers.common["x-auth-token"] = token;
//         await verifyingToken();
//       }

//       dispatch({
//         type: "REGISTRO_EXITOSO",
//         payload: res.data,
//       });

//       return { success: true };
//     } catch (error) {
//       console.error("Error en el registro:", error.response?.data || error);
//       return { error: error.response?.data?.message || "Error en el servidor" };
//     }
//   };

//   const loginClient = async (dataForm) => {
//     console.log("Intentando login con:", dataForm);

//     try {
//       const res = await clienteAxios.post("http://localhost:3003/api/clients/client-login", dataForm);
//       console.log("Respuesta del login:", res.data);

//       const token = res.data.token;
//       if (!token) {
//         console.error("No se recibió token desde el backend.");
//         return { error: "No se pudo autenticar. Intenta nuevamente." };
//       }

//       localStorage.setItem("token", token);
//       clienteAxios.defaults.headers.common["x-auth-token"] = token;
//       console.log("Token guardado en localStorage:", token);

//       const verifyResponse = await verifyingToken();

//       if (verifyResponse?.error) {
//         return { error: "Error al verificar la sesión. Inicia sesión nuevamente." };
//       }

//       dispatch({
//         type: "LOGIN_EXITOSO",
//         payload: res.data,
//       });

//       return { success: true };
//     } catch (error) {
//       console.error("❌ Error en login:", error.response?.data || error);
//       return { error: error.response?.data?.message || "Error en el servidor" };
//     }
//   };

//   const verifyingToken = async () => {
//     const token = localStorage.getItem("token");

//     if (token) {
//       console.log("Verificando token con el backend...");
//       const res = await clienteAxios.get("/clients/verify-client");
//       console.log("Cliente verificado:", res.data.client);

//       dispatch({
//         type: "OBTENER_CLIENTE",
//         payload: res.data.client,
//       });

//       return { success: true };
//     }
//     // if (!token) {
//     //   console.warn("No hay token en localStorage, no se puede verificar.");
//     //   logout();
//     //   return { error: "No hay token, inicia sesión nuevamente." };
//     // }

//     clienteAxios.defaults.headers.common["x-auth-token"] = token;

//     try {
//       console.log("🔍 Verificando token con el backend...");
//       const res = await clienteAxios.get("http://localhost:3003/api/clients/verify-client");
//       console.log("Cliente verificado:", res.data.client);

//       dispatch({
//         type: "OBTENER_CLIENTE",
//         payload: res.data.client,
//       });

//       return { success: true };
//     } catch (error) {
//       console.error(" Error en la verificación de token:", error.response?.data || error);
//       logout();
//       return { error: "Sesión no válida, inicia sesión nuevamente." };
//     }
//   };

//   const logout = () => {
//     console.log("Cerrando sesión...");
//     localStorage.removeItem("token");
//     delete clienteAxios.defaults.headers.common["x-auth-token"];

//     dispatch({
//       type: "CERRAR_SESION",
//     });
//   };

//   return (
//     <ClientContext.Provider
//       value={{
//         client: globalState.client,
//         authStatus: globalState.authStatus,
//         loading: globalState.loading,
//         registerClient,
//         verifyingToken,
//         loginClient,
//         logout,
//       }}
//     >
//       {props.children}
//     </ClientContext.Provider>
//   );
// };

// export default ClientState;

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

  // 🟢 REGISTRO DE CLIENTE
  const registerClient = async (dataForm) => {
    try {
      console.log("📩 Registrando cliente con:", dataForm);

      const res = await clienteAxios.post("/clients/register", dataForm);
      console.log("✅ Registro exitoso:", res.data);

      const { token } = res.data;
      if (token) {
        localStorage.setItem("token", token);
        await verifyingToken();
      }

      dispatch({
        type: "REGISTRO_EXITOSO",
        payload: res.data,
      });

      return { success: true };
    } catch (error) {
      console.error("❌ Error en el registro:", error.response?.data || error);
      return { error: error.response?.data?.message || "Error en el servidor" };
    }
  };

  // 🟢 LOGIN DE CLIENTE
  const loginClient = async (dataForm, navigate) => {
    try {
      const res = await clienteAxios.post("/clients/client-login", dataForm);
  
      const { token } = res.data;
      if (!token) return { error: "No se recibió token." };
  
      // ✅ Guardar el token en localStorage
      localStorage.setItem("token", token);
      clienteAxios.defaults.headers.common["x-auth-token"] = token;
  
      // ✅ Verificar el token antes de actualizar el estado global
      const verifyResponse = await verifyingToken();
      if (verifyResponse?.error) {
        return { error: "Error al verificar la sesión. Inicia sesión nuevamente." };
      }
  
      dispatch({ type: "LOGIN_EXITOSO", payload: res.data });
  
      // ✅ Redirigir a la tienda
      navigate("/store");
  
      return { success: true };
    } catch (error) {
      return { error: error.response?.data?.message || "Error en el servidor" };
    }
  };
  
  
  // 🔍 VERIFICAR TOKEN
  const verifyingToken = async () => {
    const token = localStorage.getItem("token");
  
    if (!token) {
      console.warn("⚠️ No hay token en localStorage, el usuario no está autenticado.");
      return { error: "No hay token, inicia sesión nuevamente." };
    }
  
    try {
      console.log("🔍 Verificando token con el backend...");
  
      // ✅ Usar clienteAxios en lugar de axios
      const res = await clienteAxios.get("/clients/verify-client");
  
      console.log("✅ Cliente verificado:", res.data.client);
      return { success: true };
    } catch (error) {
      console.error("❌ Error en la verificación de token:", error.response?.data || error);
  
      if (error.response?.status === 401) {
        console.warn("⚠️ Token inválido. Eliminando y cerrando sesión.");
        localStorage.removeItem("token");
      }
  
      return { error: "No se pudo verificar el token." };
    }
  };
  
  // 🟢 LOGOUT
  const logout = () => {
    console.log("🚪 Cerrando sesión...");
    localStorage.removeItem("token");

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
