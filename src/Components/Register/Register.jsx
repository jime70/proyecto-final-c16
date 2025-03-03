import React, { useState, useContext } from "react";
import ClientContext from "../../contexts/clients/ClientContext";

export default function Register() {
  const clientCtx = useContext(ClientContext);
  const { registerClient } = clientCtx;

  const [data, setData] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
  });

  const [message, setMessage] = useState(""); // 🔹 Nuevo estado para mensajes de éxito/error

  // 🔹 Maneja los cambios en los inputs
  const handleChange = (event) => {
    setData({
      ...data,
      [event.target.name]: event.target.value,
    });
  };

  // 🔹 Envía el formulario
  const sendData = async (event) => {
    event.preventDefault();
    setMessage(""); // Limpia el mensaje anterior

    const response = await registerClient(data); // Espera respuesta

    if (response?.error) {
      setMessage(`❌ Error: ${response.error}`);
    } else {
      setMessage("✅ Registro exitoso. Redirigiendo...");
      setTimeout(() => window.location.href = "/login", 2000); // Redirige al login
    }
  };

  return (
    <div>
      <h2>Crear cuenta</h2>
      
      <form onSubmit={sendData}>
        <div>
          <label htmlFor="name">Nombre</label>
          <input id="name" name="name" type="text" required onChange={handleChange} />
        </div>

        <div>
          <label htmlFor="username">Nombre de usuario</label>
          <input id="username" name="username" type="text" required onChange={handleChange} />
        </div>

        <div>
          <label htmlFor="email">Email</label>
          <input id="email" name="email" type="email" required onChange={handleChange} />
        </div>

        <div>
          <label htmlFor="password">Contraseña</label>
          <input id="password" name="password" type="password" required onChange={handleChange} />
        </div>

        <button type="submit">Registrarme</button>

        {message && <p>{message}</p>} {/* 🔹 Muestra mensaje de éxito o error */}
      </form>
    </div>
  );
}
