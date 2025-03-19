import { useContext } from "react";
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

const Cart = () => {
  const navigate = useNavigate();
  const { cart, total, removeFromCart } = useContext(CartContext);

  const formatPriceCLP = (price) => {
    return new Intl.NumberFormat("es-CL", {
      style: "currency",
      currency: "CLP",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
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
            onClick={() => navigate("/checkout")} 
          >
            Ir a Pagar
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
