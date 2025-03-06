import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ClientContext from "../../contexts/clients/ClientContext";
import { Container, Typography, Paper, Box } from "@mui/material";

const Profile = () => {
  const { client, authStatus, verifyingToken } = useContext(ClientContext);
  const navigate = useNavigate();

  useEffect(() => {
    verifyingToken();

    if (!authStatus) {
      navigate("/login"); // 🔹 Redirige si el usuario NO está autenticado
    }
  }, [authStatus, navigate]);

  return (
    <Container maxWidth="md" sx={{ marginTop: "4rem" }}>
      <Paper elevation={3} sx={{ padding: "2rem", textAlign: "center" }}>
        <Typography variant="h3" gutterBottom color="primary">
          Bienvenido a tu perfil
        </Typography>

        {client ? (
          <Box>
            <Typography variant="h5">Bienvenido, {client.name}!</Typography>
            <Typography>Email: {client.email}</Typography>
            <Typography>Usuario: {client.username}</Typography>
          </Box>
        ) : (
          <Typography>Cargando datos...</Typography>
        )}
      </Paper>
    </Container>
  );
};

export default Profile;
