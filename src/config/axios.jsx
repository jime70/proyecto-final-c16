import axios from "axios";

const backendURL = import.meta.env.VITE_BACKEND_URL || "http://localhost:3003/api"; 

console.log("✅ Backend URL cargada:", backendURL);

const clienteAxios = axios.create({
  baseURL: backendURL,
});

clienteAxios.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers["x-auth-token"] = token;
    } else {
      console.warn("⚠️ No se encontró token en localStorage");
    }
    return config;
  },
  (error) => {
    console.error("❌ Error en la configuración de la petición:", error);
    return Promise.reject(error);
  }
);

clienteAxios.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      const { status } = error.response;

      if (status === 401) {
        console.error("⛔ Sesión expirada. Redirigiendo a login...");
        localStorage.removeItem("token");
        window.location.href = "/login"; 
      } else if (status === 403) {
        console.error("⛔ Acceso prohibido. Verifica permisos.");
      } else if (status >= 500) {
        console.error("🔥 Error del servidor. Intenta más tarde.");
      }
    } else {
      console.error("⚠️ Error en la conexión al servidor.");
    }
    
    return Promise.reject(error);
  }
);

export default clienteAxios;
