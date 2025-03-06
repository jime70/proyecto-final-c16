import axios from "axios";

// Cargar la URL del backend desde las variables de entorno
const backendURL = import.meta.env.VITE_BACKEND_URL || "http://localhost:3003/api"; 

console.log("✅ Backend URL cargada:", backendURL);

// Crear instancia de axios
const clienteAxios = axios.create({
  baseURL: backendURL,
  headers: {
    "Content-Type": "application/json",
  },
});

// 🔹 Verificar si hay un token en localStorage y agregarlo automáticamente
const token = localStorage.getItem("token");
if (token) {
  console.log("🔹 Token encontrado en localStorage, agregándolo a las peticiones...");
  clienteAxios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
} else {
  console.warn("⚠️ No hay token en localStorage.");
}

export default clienteAxios;
