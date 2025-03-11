import { useEffect, useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import ClientContext from "../../contexts/clients/ClientContext";
import { Box, Typography } from "@mui/material";

export default function Login() {
  const navigate = useNavigate();
  const ctx = useContext(ClientContext);
  const { authStatus, loginClient, verifyingToken } = ctx;

  const [logClient, setLogClient] = useState({
    email: "",
    password: "",
  });

  const [errorMsg, setErrorMsg] = useState("");

  const handleChange = (e) => {
    e.preventDefault();
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
        navigate("/profile"); // 🔹 Redirigir inmediatamente después de recibir el token
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
      navigate("/profile");
    }
  }, [authStatus]);

  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "100vh", // ✅ Ocupa toda la pantalla
          paddingTop: "4rem", // ✅ Espacio extra para separar del Navbar
        }}
      >
        <Typography variant="h3" textAlign="center" padding={2} marginBottom="2rem">
          Iniciar sesión
        </Typography>

        <Typography variant="body1">
          ¿Aún sin cuenta?{" "}
          <Link to="/register" style={{ textDecoration: "none", color: "#1976d2", fontWeight: "bold" }}>
            Regístrate
          </Link>
        </Typography>

        <section>
          <div>
            <form onSubmit={handleSubmit}>
              <div>
                <label htmlFor="email">Tu correo electrónico</label>
                <div>
                  <input onChange={handleChange} name="email" type="email" required />
                </div>
              </div>

              <div>
                <label htmlFor="password">Tu contraseña</label>
                <div>
                  <input onChange={handleChange} name="password" type="password" required />
                </div>
              </div>

              <div>
                <button type="submit">Acceder a tu cuenta</button>
              </div>

              {errorMsg && (
                <div>
                  <p style={{ color: "red" }}>{errorMsg}</p>
                </div>
              )}
            </form>
          </div>
        </section>
      </Box>
    </>
  );
}
