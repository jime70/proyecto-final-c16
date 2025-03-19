import { useEffect, useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import ClientContext from "../../contexts/clients/ClientContext";
import { Box, Container, Typography, Paper, TextField, Button } from "@mui/material";

export default function Login() {
  const navigate = useNavigate();
  const ctx = useContext(ClientContext);
  const { authStatus, loginClient, verifyingToken } = ctx;
  const [message, setMessage] = useState("");

  const [logClient, setLogClient] = useState({
    email: "",
    password: "",
  });

  const [errorMsg, setErrorMsg] = useState("");

  const handleChange = (e) => {
    setLogClient({
      ...logClient,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await loginClient(logClient);

      if (res && res.token) {
        localStorage.setItem("token", res.token);
        navigate("/store"); // 🔹 Redirigir a Store en lugar de Profile
      } else {
        setErrorMsg("Error en el login: No se recibió token");
      }
    } catch (error) {
      setErrorMsg(error.response?.data?.message || "Error en el login");
    }
  };

  useEffect(() => {
    verifyingToken();
    if (authStatus) {
      navigate("/store"); // 🔹 Redirigir a Store si ya está autenticado
    }
  }, [authStatus, navigate]);

  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "100vh", 
          paddingTop: "4rem", 
        }}
      >
        <Container maxWidth="sm"> 
          <Paper elevation={3} sx={{ padding: "2rem", textAlign: "center" }}>
            <Typography variant="h3" textAlign="center" padding={2} marginBottom="2rem">
              Iniciar sesión
            </Typography>

            <Typography variant="body1">
              ¿Aún sin cuenta?{" "}
              <Link to="/register" style={{ textDecoration: "none", color: "#1976d2", fontWeight: "bold" }}>
                Regístrate
              </Link>
            </Typography>

            {/* 🔹 Agregamos onSubmit para ejecutar handleSubmit */}
            <form onSubmit={handleSubmit}> 
              <TextField fullWidth label="Email" name="email" type="email" required onChange={handleChange} margin="normal" />
              <TextField fullWidth label="Contraseña" name="password" type="password" required onChange={handleChange} margin="normal" />

              <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
                Iniciar sesión
              </Button>

              {errorMsg && <Typography color="error" sx={{ mt: 2 }}>{errorMsg}</Typography>}
            </form>
          </Paper>
        </Container>
      </Box>
    </>
  );
}
