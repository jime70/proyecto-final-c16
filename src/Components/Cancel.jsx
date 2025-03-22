import React from "react";
import { useNavigate } from "react-router-dom";
import { Button, Card, CardContent, Typography, Box } from "@mui/material";

const Cancel = () => {
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
        El Pago no se ha Concretado
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
            Notamos que no has concretado tu compra. Es una lástima, pero no te preocupes, no se ha realizado ningún cargo en el proceso.
          </Typography>
          <Typography className="text-gray-500 mb-6">
            Te esperamos para cuando quieras continuar con tu compra.
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

export default Cancel;
