import axios from "axios";

const backendURL = import.meta.env.VITE_BACKEND_URL;
console.log("Backend URL cargada:", import.meta.env.VITE_BACKEND_URL);


const clienteAxios = axios.create({
  baseURL: backendURL, 
  headers: {
    "Content-Type": "application/json", 
  },
});

export default clienteAxios;
