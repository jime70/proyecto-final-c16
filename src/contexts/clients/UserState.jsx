import React, { useReducer } from "react";
import UserContext from "./UserContext";
import UserReducer from "./UserReducer";
import clienteAxios from "../../config/axios";

const UserState = (props) => {
  const initialState = {
    user: null,
    authStatus: false,
    loading: true,
  };

  const [state, dispatch] = useReducer(UserReducer, initialState);

  const registerUser = async (formData) => {
    try {
      const res = await clienteAxios.post("/api/clients/register", formData);
      console.log("Registro exitoso:", res);
      dispatch({
        type: "REGISTRO_EXITOSO",
        payload: res.data.token,
      });
    } catch (error) {
      console.error("Error al registrar:", error);
    }
  };

  return (
    <UserContext.Provider
      value={{
        user: state.user,
        authStatus: state.authStatus,
        loading: state.loading,
        registerUser,
      }}
    >
      {props.children}
    </UserContext.Provider>
  );
};

export default UserState;
