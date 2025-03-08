import { useState, useEffect, useContext } from "react";
import ClientContext from "../../contexts/clients/ClientContext";
import StoreContext from "../../contexts/store/StoreContext";
import { Box, Typography, Button, List, ListItem, ListItemText } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function Checkout() {
  const navigate = useNavigate();
  const clientCtx = useContext(ClientContext);
  const { authStatus } = clientCtx;
  const storeCtx = useContext(StoreContext);
  const { cart, total, createCheckoutSession } = storeCtx;

  useEffect(() => {
    if (!authStatus) {
      navigate("/login");
    }
  }, [authStatus, navigate]);

  return (
    <Box padding={4} textAlign="center">
      <Typography variant="h3" gutterBottom>
        Carrito de Compras
      </Typography>
      {cart.length > 0 ? (
        <>
          <List>
            {cart.map((item) => (
              <ListItem key={item._id} divider>
                <ListItemText primary={item.name} secondary={`Cantidad: ${item.quantity} - Precio: $${item.price}`} />
              </ListItem>
            ))}
          </List>
          <Typography variant="h5" marginTop={2}>
            Total: ${total.toFixed(2)}
          </Typography>
          <Button
            variant="contained"
            color="primary"
            sx={{ marginTop: 3 }}
            onClick={createCheckoutSession}
          >
            Pagar con Stripe
          </Button>
        </>
      ) : (
        <Typography variant="h6" color="textSecondary">
          No hay artículos en el carrito.
        </Typography>
      )}
    </Box>
  );
}
