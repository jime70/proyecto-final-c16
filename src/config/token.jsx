import clienteAxios from "./axios";

const getToken = () => {
  const token = localStorage.getItem("token");

  if (token) {
    clienteAxios.defaults.headers.common["x-auth-token"] = token;
  } else {
    delete clienteAxios.defaults.headers.common["x-auth-token"];
  }
};

export default getToken;
