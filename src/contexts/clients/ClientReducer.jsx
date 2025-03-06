const reducers = (globalState, action) => {
  switch (action.type) {
    case "LOGIN_EXITOSO":
    case "REGISTRO_EXITOSO":
      const { client, token } = action.payload;
      if (!token) {
        console.error("❌ No hay token en el payload");
        return globalState;
      }

      localStorage.setItem("token", token);

      return {
        ...globalState,
        authStatus: true,
        client,
        token,
      };

    case "OBTENER_CLIENTE":
      if (!action.payload) {
        console.error("❌ No se recibió un cliente válido en OBTENER_CLIENTE");
        return globalState;
      }
      return {
        ...globalState,
        authStatus: true,
        client: action.payload,
      };

    case "CERRAR_SESION":
      localStorage.removeItem("token");

      return {
        ...globalState,
        client: null,
        authStatus: false,
        loading: false,
        token: null,
      };

    default:
      return globalState;
  }
};

export default reducers;
