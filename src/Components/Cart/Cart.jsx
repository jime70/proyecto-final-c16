import { useContext, useState } from "react";
import {
  Box,
  Typography,
  List,
  ListItem,
  ListItemText,
  Button,
} from "@mui/material";
import CartContext from "../../contexts/Cart/CartContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Cart = () => {
  const navigate = useNavigate();
  const { cart, total, removeFromCart } = useContext(CartContext);
  const [loading, setLoading] = useState(false);

  const formatPriceCLP = (price) => {
    return new Intl.NumberFormat("es-CL", {
      style: "currency",
      currency: "CLP",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  const handleSendToBack = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        alert("Debes iniciar sesión para realizar el pago");
        return;
      }

      const formattedCart = cart.map((item) => {
        if (!item.priceID) {
          console.error(`⛔ El producto "${item.name}" no tiene un priceID.`);
          return null; 
        }
        return {
          price: item.priceID, 
          quantity: item.quantity,
        };
      }).filter(Boolean); 

      if (formattedCart.length === 0) {
        alert("El carrito está vacío o contiene productos sin priceID.");
        return;
      }

      setLoading(true);

      const backendUrl = import.meta.env.VITE_BACKEND_URL;
      console.log("🌐 Backend URL:", backendUrl); // ➤ Debe mostrar http://localhost:3003/api

      const response = await axios.post(
        `http://localhost:3003/api/checkout/create-checkout-session`,
        { cart: formattedCart },
        {
          headers: {
            "Content-Type": "application/json",
            "x-auth-token": token,
          },
        }
      );

      if (response.data && response.data.sessionURL) {
        window.location.href = response.data.sessionURL;
      } else {
        console.error("Error creando sesión:", response.data);
        alert("No se pudo iniciar el pago.");
      }
    } catch (err) {
      console.error("❌ Error al enviar carrito:", err);
      alert("Error al conectar con el servidor.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box padding={6} textAlign="center" sx={{ marginTop: "6rem" }}>
      <Typography variant="h3" gutterBottom>
        Carrito de Compras
      </Typography>

      {cart.length > 0 ? (
        <>
          <List>
            {cart.map((article) => (
              <ListItem key={article._id} divider>
                <ListItemText
                  primary={article.name}
                  secondary={`Cantidad: ${article.quantity} - Precio: ${formatPriceCLP(article.price)}`}
                />
                <Button
                  variant="outlined"
                  color="error"
                  onClick={() => removeFromCart(article._id)}
                >
                  Eliminar
                </Button>
              </ListItem>
            ))}
          </List>

          <Typography variant="h5" marginTop={2}>
            Total a pagar: {formatPriceCLP(total)}
          </Typography>

          <Button
            variant="contained"
            color="primary"
            sx={{ marginTop: 3 }}
            onClick={handleSendToBack}
            disabled={loading}
          >
            {loading ? "Procesando..." : "Ir a Pagar"}
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

export default Cart;
