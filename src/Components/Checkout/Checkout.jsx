import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import ClientContext from "../../contexts/clients/ClientContext";
import CartContext from "../../contexts/Cart/CartContext"; 
import { Box, Typography, Button, List, ListItem, ListItemText } from "@mui/material";

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

  const handlePayment = async () => {
    if (!cart || cart.length === 0) {
      alert("⚠️ El carrito está vacío. No se puede proceder con el pago.");
      return;
    }

    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        alert("No se encontró el token. Inicia sesión nuevamente.");
        navigate("/login");
        return;
      }

      const formattedCart = cart.map(item => ({
        priceID: item.priceID, // 🔹 Se debe usar el priceID de Stripe
        quantity: item.quantity
      }));

      const response = await fetch("http://localhost:3003/api/checkout/create-checkout-session", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-auth-token": token, 
        },
        body: JSON.stringify({ cart: formattedCart }),  // 🔥 Enviar carrito al backend
      });

      const data = await response.json();

      if (response.ok && data.sessionURL) {
        window.location.href = data.sessionURL; // 🚀 Redirigir a Stripe
      } else {
        alert("Error al procesar el pago. Inténtalo de nuevo.");
      }
    } catch (error) {
      alert("Hubo un error al conectar con el servidor.");
    } finally {
      setLoading(false);
    }
  };

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
            {cart.map((item) => (
              <ListItem key={item._id} divider>
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
            onClick={handlePayment}
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
