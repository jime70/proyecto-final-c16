// import React, { useState } from "react";
// import axios from "axios";

// export default function Login() {
//   const [data, setData] = useState({
//     email: "",
//     password: "",
//   });

//   const [message, setMessage] = useState("");

//   const handleChange = (event) => {
//     setData({
//       ...data,
//       [event.target.name]: event.target.value,
//     });
//   };

//   const sendData = async (event) => {
//     event.preventDefault();
//     setMessage("");

//     try {
//       console.log("🔍 Enviando datos de login:", data);

//       // 🚀 Hacer la petición sin usar el ClientState
//       const res = await axios.post("http://localhost:3003/api/clients/client-login", data);

//       console.log("✅ Respuesta del login:", res.data);

//       const token = res.data.token;
//       if (!token) {
//         setMessage("❌ No se recibió token. Intenta nuevamente.");
//         return;
//       }

//       // 🔹 Guardar el token manualmente en localStorage
//       localStorage.setItem("token", token);
//       console.log("📌 Token guardado en localStorage:", token);

//       setMessage("✅ Inicio de sesión exitoso. Redirigiendo...");

//       // 🔹 Redirigir después de 2 segundos
//       setTimeout(() => {
//         window.location.href = "/profile";
//       }, 2000);

//     } catch (error) {
//       console.error("❌ Error en login:", error.response?.data || error);
//       setMessage(`❌ Error: ${error.response?.data?.message || "Error en el servidor"}`);
//     }
//   };

//   return (
//     <div>
//       <h2>Iniciar sesión</h2>

//       <form onSubmit={sendData}>
//         <div>
//           <label htmlFor="email">Email</label>
//           <input id="email" name="email" type="email" required onChange={handleChange} />
//         </div>

//         <div>
//           <label htmlFor="password">Contraseña</label>
//           <input id="password" name="password" type="password" required onChange={handleChange} />
//         </div>

//         <button type="submit">Ingresar</button>

//         {message && <p>{message}</p>}
//       </form>
//     </div>
//   );
// }
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Login() {
  const navigate = useNavigate();
  const [data, setData] = useState({ email: "", password: "" });
  const [message, setMessage] = useState("");

  useEffect(() => {
    
    const token = localStorage.getItem("token");

    if (token) {
      console.log("✅ Token encontrado en localStorage. Manteniendo sesión activa.");
      axios.defaults.headers.common["x-auth-token"] = token; 
      navigate("/store"); 
    }
  }, []);

  const handleChange = (event) => {
    setData({ ...data, [event.target.name]: event.target.value });
  };

  const sendData = async (event) => {
    event.preventDefault();
    setMessage("");

    try {
      const res = await axios.post("http://localhost:3003/api/clients/client-login", data);
      
      const { token } = res.data;
      if (!token) {
        setMessage("❌ No se recibió token.");
        return;
      }

      // ✅ Guardar el token en localStorage
      localStorage.setItem("token", token);
      axios.defaults.headers.common["x-auth-token"] = token; // 🔹 Configurar token en todas las peticiones de Axios

      setMessage("✅ Inicio de sesión exitoso. Redirigiendo...");
      
      setTimeout(() => navigate("/store"), 2000); // 🔹 Redirigir a Store después de login

    } catch (error) {
      setMessage(`❌ Error: ${error.response?.data?.message || "Error en el servidor"}`);
    }
  };

  return (
    <div>
      <h2>Iniciar sesión</h2>
      <form onSubmit={sendData}>
        <div>
          <label htmlFor="email">Email</label>
          <input id="email" name="email" type="email" required onChange={handleChange} />
        </div>
        <div>
          <label htmlFor="password">Contraseña</label>
          <input id="password" name="password" type="password" required onChange={handleChange} />
        </div>
        <button type="submit">Ingresar</button>
        {message && <p>{message}</p>}
      </form>
    </div>
  );
}
