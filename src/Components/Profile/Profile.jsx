import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ClientContext from "../../contexts/clients/ClientContext";
import { Container, Typography, Paper, Box, Button } from "@mui/material";

const Profile = () => {
  const navigate = useNavigate();
  const clientCtx = useContext(ClientContext);
  const { client, authStatus, getClientData } = clientCtx;

  useEffect(() => {
    if (!authStatus) {
      navigate("/login");
    } else if (!client) {
      getClientData(); // 📌 Obtener datos cuando se carga la página
    }
  }, [authStatus, navigate, getClientData]);

  return (
    <Container maxWidth="md" sx={{ marginTop: "6rem", marginBottom: "6rem" }}>
      <Paper elevation={3} sx={{ padding: "2rem", textAlign: "center" }}>
        {/* ✅ Título con nombre del cliente */}
        <Typography variant="h4" gutterBottom color="primary">
          {client?.name ? `Hola, ${client.name}!` : "Cargando datos..."}
        </Typography>

        {/* ✅ Información del cliente en formato eCommerce */}
        {client ? (
          <Box sx={{ textAlign: "left", marginTop: "1rem" }}>
            <Typography variant="h6"><strong>Nombre:</strong> {client.name}</Typography>
            <Typography variant="h6"><strong>Apellido:</strong> {client.lastname || "No registrado"}</Typography>
            <Typography variant="h6"><strong>Email:</strong> {client.email}</Typography>
            <Typography variant="h6"><strong>País:</strong> {client.country || "No registrado"}</Typography>
            <Typography variant="h6"><strong>Dirección:</strong> {client.address || "No registrada"}</Typography>
            <Typography variant="h6"><strong>Código Postal:</strong> {client.zipcode || "No registrado"}</Typography>
          </Box>
        ) : (
          <Typography>Cargando datos...</Typography>
        )}

        {/* ✅ Botón para actualizar datos */}
        <Button
          variant="contained"
          color="primary"
          sx={{ marginTop: "2rem" }}
          onClick={() => navigate("/profile/edit")} // 📌 Redirigir al formulario de edición
        >
          Actualizar datos
        </Button>
      </Paper>
    </Container>
  );
};

export default Profile;
