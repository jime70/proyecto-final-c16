import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../../config/axios"; 
import { Box, Container, Typography, Paper, Button, TextField } from "@mui/material";

export default function Register() {
  const navigate = useNavigate();
  
  const [data, setData] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
  });

  
  const [message, setMessage] = useState("");

  
  const handleChange = (event) => {
    setData({ ...data, [event.target.name]: event.target.value });
  };

  
  const sendData = async (event) => {
    event.preventDefault();
    setMessage(""); 

    try {
      console.log("📤 Enviando datos al backend:", data);
      
      const res = await axios.post("/clients/register", data);

      console.log("✅ Registro exitoso:", res.data);

      const { token, client } = res.data;
      
      if (!token) {
        console.error("❌ No se recibió token del backend.");
        setMessage("❌ Error en el registro: No se recibió un token.");
        return;
      }

      localStorage.setItem("token", token); 

      navigate("/store");
      
    } catch (error) {
      console.error("❌ Error en el registro:", error.response?.data || error);
      setMessage(`❌ ${error.response?.data?.message || "Error en el servidor"}`);
    }
  };

  return (
    <Box sx={{ minHeight: "80vh", display: "flex", alignItems: "center", justifyContent: "center", marginTop: "4rem" }}>
      <Container maxWidth="sm">
        <Paper elevation={3} sx={{ padding: "2rem", textAlign: "center" }}>
          <Typography variant="h3" gutterBottom fontWeight={600} color="#2D336B">
            Crear cuenta
          </Typography>

          <form onSubmit={sendData}>
            <TextField fullWidth label="Nombre" name="name" required onChange={handleChange} margin="normal" />
            <TextField fullWidth label="Nombre de usuario" name="username" required onChange={handleChange} margin="normal" />
            <TextField fullWidth label="Email" name="email" type="email" required onChange={handleChange} margin="normal" />
            <TextField fullWidth label="Contraseña" name="password" type="password" required onChange={handleChange} margin="normal" />

            <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
              Registrarme
            </Button>

            {message && <Typography color="error" sx={{ mt: 2 }}>{message}</Typography>}
          </form>
        </Paper>
      </Container>
    </Box>
  );
}
