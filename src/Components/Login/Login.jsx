import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const navigate = useNavigate();
  const [data, setData] = useState({
    username: "",
    password: "",
  });

  const [message, setMessage] = useState("");

  const handleChange = (event) => {
    setData({
      ...data,
      [event.target.name]: event.target.value,
    });
  };

  const sendData = async (event) => {
    event.preventDefault();
    setMessage("");

    try {
      const response = await axios.post(
        "http://localhost:3003/api/clients/client-login",
        data
      );

      if (response.status === 200) {
        const token = response.data.token;
        localStorage.setItem("token", token); // Guarda el token en localStorage
        setMessage("Inicio de sesión exitoso. Redirigiendo...");
        setTimeout(() => navigate("/store"), 2000); // Redirige a la tienda
      } else {
        setMessage(response.data.msg || "Error en el inicio de sesión.");
      }
    } catch (error) {
      console.error("Error al iniciar sesión:", error);
      setMessage(
        error.response?.data?.message || "Error en el servidor. Intenta de nuevo."
      );
    }
  };

  return (
    <div>
      <h2>Iniciar Sesión</h2>

      <form onSubmit={sendData}>
        <div>
          <label htmlFor="username">Usuario</label>
          <input
            id="username"
            name="username"
            type="text"
            required
            onChange={handleChange}
          />
        </div>

        <div>
          <label htmlFor="password">Contraseña</label>
          <input
            id="password"
            name="password"
            type="password"
            required
            onChange={handleChange}
          />
        </div>

        <button type="submit">Iniciar Sesión</button>
      </form>

      {message && <p>{message}</p>}
    </div>
  );
};

export default Login;
