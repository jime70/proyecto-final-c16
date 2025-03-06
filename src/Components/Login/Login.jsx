import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ClientContext from "../../contexts/clients/ClientContext";
import clienteAxios from "../../config/axios";
import { Box, Container, Typography, Paper, Button } from "@mui/material";

export default function Login() {
  const navigate = useNavigate();
  const { verifyingToken } = useContext(ClientContext);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      clienteAxios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      verifyingToken();
      navigate("/profile"); // 🔹 Redirigir al perfil si hay un token en localStorage
    }
  }, []);

  const sendData = async (event) => {
    event.preventDefault();

    const email = event.target.email.value;
    const password = event.target.password.value;

    try {
      const res = await clienteAxios.post("/clients/client-login", { email, password });

      if (res.data.token) {
        localStorage.setItem("token", res.data.token);
        clienteAxios.defaults.headers.common["Authorization"] = `Bearer ${res.data.token}`;

        navigate("/profile"); // 🔹 Redirigir directamente sin usar useState
      } else {
        console.error("Error en el login: No se recibió token");
      }
    } catch (error) {
      console.error("Error en login:", error.response?.data || error);
    }
  };

  return (
    <Box
      sx={{
        minHeight: "80vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        marginTop: "6rem",
        marginBottom: "6rem",
      }}
    >
      <Container maxWidth="sm">
        <Paper elevation={3} sx={{ padding: "2rem", textAlign: "center" }}>
          <Typography variant="h3" gutterBottom fontWeight={600} color="#2D336B">
            Iniciar sesión
          </Typography>

          <form onSubmit={sendData}>
            <input type="hidden" name="remember" value="true" />

            <Container>
              <Box sx={{ mb: "1rem" }}>
                <label htmlFor="email-address">Tu correo</label>
                <input
                  id="email-address"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  placeholder="Tu correo"
                  style={{ width: "100%", padding: "0.5rem" }}
                />
              </Box>

              <Box sx={{ mb: "1rem" }}>
                <label htmlFor="password">Password</label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  placeholder="Password"
                  style={{ width: "100%", padding: "0.5rem" }}
                />
              </Box>

              <Button
                type="submit"
                variant="contained"
                color="primary"
                sx={{
                  width: "100%",
                  padding: "0.75rem",
                  "&:hover": { backgroundColor: "#0d47a1" },
                }}
              >
                Iniciar sesión
              </Button>
            </Container>
          </form>
        </Paper>
      </Container>
    </Box>
  );
}
