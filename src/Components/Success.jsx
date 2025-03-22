import React from "react";
import { useNavigate } from "react-router-dom";
import { Button, Card, CardContent, Typography, Box } from "@mui/material";

const Success = () => {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        minHeight: "100vh", 
        display: "flex",
        flexDirection: "column", 
        justifyContent: "center", 
        alignItems: "center", 
        backgroundColor: "#f5f5f5", 
      }}
    >
      <Typography
        variant="h2"
        fontWeight={300}
        sx={{ marginTop: "8rem", marginBottom: "3rem" }}
      >
        ¡Pago Exitoso!
      </Typography>

      <Card sx={{ 
        padding: "2rem", 
        backgroundColor: "#fff", 
        boxShadow: 3, 
        width: "100%",
        maxWidth: "600px", 
        borderRadius: 2, 
      }}>
        <CardContent sx={{ paddingBottom: "2rem" }}>
          <Typography className="text-lg text-gray-400 mb-4">
            Tu compra ha sido procesada correctamente. 🎉
          </Typography>
          <Typography className="text-gray-500 mb-6">
            Recibirás un correo con los detalles de tu compra.
          </Typography>

          <Button
            variant="contained"
            color="primary"
            size="medium"
            sx={{
              width: 200,
              marginBottom: 3,
              marginTop: 2,
              padding: "10px 20px", 
            }}
            onClick={() => navigate("/store")}
          >
            Volver a la Tienda
          </Button>
        </CardContent>
      </Card>

      <Box sx={{ flexGrow: 1 }} /> 
    </Box>
  );
};

export default Success;
