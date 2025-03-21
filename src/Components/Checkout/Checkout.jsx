import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import ClientContext from "../../contexts/clients/ClientContext";
import CartContext from "../../contexts/Cart/CartContext"; 
import { Box, Typography, Button, List, ListItem, ListItemText } from "@mui/material";
import { handlePayment } from "../Cart/payment";

const Checkout = () => {
  const navigate = useNavigate();
  const { client, authStatus } = useContext(ClientContext);
  const { cart, total } = useContext(CartContext); 
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!authStatus) {
      navigate("/login");
    }
  }, [authStatus, navigate]);

  const formatPriceCLP = (price) => {
    return new Intl.NumberFormat("es-CL", {
      style: "currency",
      currency: "CLP",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  return (
    <Box padding={4} textAlign="center">
      <Typography variant="h3" gutterBottom>
        Carrito de Compras
      </Typography>

      {cart.length > 0 ? (
        <>
          <List>
            {cart.map((item, index) => (
              <ListItem key={`${item._id}-${index}`} divider>
                <ListItemText
                  primary={item.name}
                  secondary={`Cantidad: ${item.quantity} - Precio: ${formatPriceCLP(item.price)}`}
                />
              </ListItem>
            ))}
          </List>

          <Typography variant="h5" marginTop={2}>
            Total: {formatPriceCLP(total)}
          </Typography>

          <Button
            variant="contained"
            color="primary"
            sx={{ marginTop: 3 }}
            onClick={() => handlePayment(cart, setLoading, navigate)}
            disabled={loading}
          >
            {loading ? "Procesando..." : "Pagar con Stripe"}
          </Button>
        </>
      ) : (
        <Typography variant="h6" color="textSecondary">
          No hay artículos en el carrito.
        </Typography>
      )}
    </Box>
  );
};

export default Checkout;