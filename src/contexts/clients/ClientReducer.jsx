const reducer = (globalState, action) => {
  switch (action.type) {
    case "REGISTRO_EXITOSO":
    case "LOGIN_EXITOSO":
      localStorage.setItem("token", action.payload);

      return {
        ...globalState,
        authStatus: true,
      };

    case "CERRAR_SESION":
      localStorage.removeItem("token");

      return {
        ...globalState,
        currentClient: null,
        cart: [],
        sessionURL: null,
        authStatus: null,
        msg: action.payload,
      };

    case "OBTENER_CLIENTE":
      return {
        ...globalState,
        authStatus: true,
        client: action.payload,
      };

    case "GET_CART":
      return {
        ...globalState,
        cart: action.payload,
      };

    case "GET_CHECKOUT_SESSION":
      return {
        ...globalState,
        sessionURL: action.payload,
      };

    case "CHANGE_STATUS_LOADING":
      return {
        ...globalState,
        globalLoading: action.payload,
      };

    default:
      return globalState;
  }
};

export default reducer;