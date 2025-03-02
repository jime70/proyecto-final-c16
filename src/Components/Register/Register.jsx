import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Register = () => {
  const navigate = useNavigate();
  const [data, setData] = useState({
    name: "",
    username: "",
    email: "",
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
        "http://localhost:3003/api/clients/register",
        data
      );

      if (response.status === 201) {
        setMessage("Registro exitoso. Redirigiendo...");
        setTimeout(() => navigate("/login"), 2000);
      } else {
        setMessage(response.data.msg || "Hubo un error en el registro.");
      }
    } catch (error) {
      console.error("Error al registrar usuario:", error);
      setMessage(
        error.response?.data?.msg || "Error en el servidor. Intenta de nuevo."
      );
    }
  };

  return (
    <div>
      <h2>Crear cuenta</h2>

      <form onSubmit={sendData}>
        <div>
          <label htmlFor="name">Nombre</label>
          <input
            id="name"
            name="name"
            type="text"
            required
            onChange={handleChange}
          />
        </div>

        <div>
          <label htmlFor="username">Nombre de usuario</label>
          <input
            id="username"
            name="username"
            type="text"
            required
            onChange={handleChange}
          />
        </div>

        <div>
          <label htmlFor="email">Email</label>
          <input
            id="email"
            name="email"
            type="email"
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

        <button type="submit">Registrarme</button>
      </form>

      {message && <p>{message}</p>}
    </div>
  );
};

export default Register;
