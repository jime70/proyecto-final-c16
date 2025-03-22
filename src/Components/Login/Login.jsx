import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
  Container,
  Box,
  TextField,
  Button,
  Typography,
  Paper,
} from "@mui/material";

export default function Login() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:3003/api/clients/client-login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await response.json();

      if (!response.ok || !data.token) {
        setError(data.message || "Credenciales incorrectas");
        return;
      }

      localStorage.setItem("token", data.token);
      navigate("/store");
    } catch (err) {
      console.error("❌ Error en login:", err);
      setError("Hubo un problema al intentar iniciar sesión.");
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Container maxWidth="sm">
        <Paper elevation={3} sx={{ padding: 4, borderRadius: 3 }}>
          <Typography
            variant="h4"
            gutterBottom
            textAlign="center"
            sx={{ fontWeight: "bold", textTransform: "uppercase" }}
          >
            Iniciar Sesión
          </Typography>

          <form onSubmit={handleLogin}>
            <TextField
              label="Correo electrónico"
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              fullWidth
              required
              margin="normal"
            />

            <TextField
              label="Contraseña"
              name="password"
              type="password"
              value={form.password}
              onChange={handleChange}
              fullWidth
              required
              margin="normal"
            />

            {error && (
              <Typography color="error" sx={{ mt: 2 }}>
                {error}
              </Typography>
            )}

            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              sx={{ mt: 3, py: 1.5, fontWeight: "bold" }}
            >
              Ingresar
            </Button>
          </form>

          <Box mt={3} textAlign="center">
            <Typography variant="body2">
              ¿No tienes cuenta?{" "}
              <Link to="/register" style={{ textDecoration: "none", color: "#1976d2", fontWeight: "bold" }}>
                Regístrate aquí
              </Link>
            </Typography>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
}
