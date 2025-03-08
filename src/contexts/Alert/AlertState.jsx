import { useReducer } from "react";
import AlertReducer from "./AlertReducer";
import AlertContext from "./AlertContext";

const AlertState = (props) => {
  const initialState = {
    alerta: null,
  };

  const [globalState, dispatch] = useReducer(AlertReducer, initialState);

  const showAlert = (mensaje) => {
    dispatch({
      type: "MOSTRAR_ALERTA",
      payload: mensaje,
    });

    setTimeout(() => {
      dispatch({ type: "OCULTAR_ALERTA" });
    }, 3000);
  };

  return (
    <AlertContext.Provider value={{ alerta: globalState.alerta, showAlert }}>
      {props.children}
    </AlertContext.Provider>
  );
};

export default AlertState;
