const storeReducer = (globalState, action) => {
    switch (action.type) {
      case "OBTENER_PRODUCTOS":
        return {
          ...globalState,
          productos: action.payload,
        };
  
      case "OBTENER_PRODUCTO":
        return {
          ...globalState,
          productoActual: action.payload,
        };
  
      default:
        return globalState;
    }
  };
  
  export default storeReducer;
  