import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ClientContext from "../../contexts/clients/ClientContext";
import AlertContext from "../../contexts/Alert/AlertContext";
import { Container, Typography, Paper, Box, TextField, Button } from "@mui/material";

const ProfileEdit = () => {
  const navigate = useNavigate();
  const alertCtx = useContext(AlertContext);
  const { setShowOn } = alertCtx;

  const clientCtx = useContext(ClientContext);
  const { client, authStatus, getClientData, clientSubmitForm } = clientCtx;

  useEffect(() => {
    if (!authStatus) {
      navigate("/login");
    } else {
      getClientData(); 
    }
  }, [authStatus, navigate, getClientData]);

  const [clientForm, setClientForm] = useState({
    _id: "",
    name: "",
    lastname: "",
    email: "",
    country: "",
    address: "",
    zipcode: "",
  });

  useEffect(() => {
    if (client) {
      setClientForm({
        _id: client._id || "",
        name: client.name || "",
        lastname: client.lastname || "",
        email: client.email || "",
        country: client.country || "",
        address: client.address || "",
        zipcode: client.zipcode || "",
      });
    }
  }, [client]);

  const handleChange = (event) => {
    setClientForm({
      ...clientForm,
      [event.target.name]: event.target.value,
    });
  };

  const sendData = async (event) => {
    event.preventDefault();

    if (!clientForm._id) {
      console.error("❌ Error: No hay ID del cliente.");
      return;
    }

    await clientSubmitForm(clientForm);
    setShowOn({
      show: true,
      msg: "Usuario actualizado correctamente",
      cta: "Cerrar",
      ctaURL: "/profile", 
    });

    navigate("/profile");
  };

  return (
    <Container maxWidth="md" sx={{ marginTop: "6rem", marginBottom: "6rem" }}>
      <Paper elevation={3} sx={{ padding: "2rem", textAlign: "center" }}>
        <Typography variant="h4" gutterBottom color="primary">
          Editar Perfil
        </Typography>

        <form onSubmit={sendData}>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            <TextField
              label="Nombre"
              name="name"
              value={clientForm.name}
              onChange={handleChange}
              required
            />
            <TextField
              label="Apellido"
              name="lastname"
              value={clientForm.lastname}
              onChange={handleChange}
              required
            />
            <TextField
              label="Email"
              name="email"
              value={clientForm.email}
              disabled
            />
            <TextField
              label="País"
              name="country"
              value={clientForm.country}
              onChange={handleChange}
            />
            <TextField
              label="Dirección"
              name="address"
              value={clientForm.address}
              onChange={handleChange}
            />
            <TextField
              label="Código Postal"
              name="zipcode"
              value={clientForm.zipcode}
              onChange={handleChange}
              type="number"
            />
          </Box>

          <Button
            type="submit"
            variant="contained"
            color="primary"
            sx={{ mt: 2 }}
          >
            Guardar cambios
          </Button>

         
          <Button
            variant="outlined"
            color="secondary"
            sx={{ mt: 2, ml: 2 }}
            onClick={() => navigate("/profile")}
          >
            Cancelar
          </Button>
        </form>
      </Paper>
    </Container>
  );
};

export default ProfileEdit;
