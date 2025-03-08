const alertReducer = (globalState, action) => {
    switch (action.type) {
      case "MOSTRAR_ALERTA":
        return {
          ...globalState,
          alerta: action.payload,
        };
  
      case "OCULTAR_ALERTA":
        return {
          ...globalState,
          alerta: null,
        };
  
      default:
        return globalState;
    }
  };
  
  export default alertReducer;
  