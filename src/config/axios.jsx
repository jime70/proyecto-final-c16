import axios from "axios";

const backendURL = import.meta.env.VITE_BACKEND_URL || "http://localhost:3003/api"; // Valor por defecto
console.log("✅ Backend URL cargada:", backendURL);

const clienteAxios = axios.create({
  baseURL: backendURL,
  headers: {
    "Content-Type": "application/json",
  },
});

export default clienteAxios;
