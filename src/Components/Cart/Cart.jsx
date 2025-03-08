import { useContext } from "react";
import { Box, Typography, List, ListItem, ListItemText, Button } from "@mui/material";
import StoreContext from "../../contexts/store/StoreContext";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const navigate = useNavigate();
  const { cart, total, removeFromCart } = useContext(StoreContext);

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
                  secondary={`Cantidad: ${item.quantity} - Precio: $${item.price}`}
                />
                <Button variant="outlined" color="error" onClick={() => removeFromCart(item._id)}>
                  Eliminar
                </Button>
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
