import { useEffect, useState, useContext } from "react";
import {
  Card,
  CardContent,
  Typography,
  CircularProgress,
  Button,
  Box,
  CardActionArea,
  CardActions,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import ClientContext from "../contexts/clients/ClientContext";
import CartContext from "../contexts/Cart/CartContext"; 

const Store = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const { authStatus } = useContext(ClientContext);
  const { addToCart, cart } = useContext(CartContext); 

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const response = await fetch(
          "http://localhost:3003/api/articles/readall"
        );
        if (!response.ok) throw new Error("Error al obtener los artículos");
        const data = await response.json();
        setArticles(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchArticles();
  }, []);

  useEffect(() => {
    console.log("🔄 Carrito actualizado:", cart);
  }, [cart]);

  if (loading) {
    return (
      <Box textAlign="center" padding="2rem">
        <CircularProgress />
        <p>Cargando artículos...</p>
      </Box>
    );
  }

  if (error) return <p style={{ color: "red" }}>Error: {error}</p>;

  return (
    <>
      <Box padding="2rem">
        <Typography
          variant="h4"
          textAlign="center"
          sx={{ color: "text.secondary", mt: 6 }}
        >
          Tienda de Productos
        </Typography>
      </Box>
      <Box padding="1rem">
        <Box
          display="grid"
          gridTemplateColumns="repeat(auto-fill, minmax(250px, 1fr))"
          gap="20px"
        >
          {articles.map((article) => (
            <Card
              key={article._id}
              sx={{ padding: "10px", textAlign: "center" }}
            >
              <CardActionArea
                component={Link}
                to={`/store/${article._id}`}
                state={{ article }}
              >
                <img
                  src={article.pic}
                  alt={article.name}
                  style={{
                    width: "100%",
                    height: "150px",
                    objectFit: "cover",
                    borderRadius: "8px",
                  }}
                />
                <CardContent>
                  <Typography variant="h6">{article.name}</Typography>
                  <Typography>
                    Precio:{" "}
                    {article.price
                      ? new Intl.NumberFormat("es-CL", {
                          style: "currency",
                          currency: "CLP",
                          minimumFractionDigits: 0,
                          maximumFractionDigits: 0,
                        }).format(article.price)
                      : "No disponible"}
                  </Typography>
                </CardContent>
              </CardActionArea>
              <CardActions>
                <Button
                  variant="contained"
                  color="primary"
                  component={Link}
                  to={`/store/${article._id}`}
                  state={{ article }}
                  sx={{ fontSize: "12px", padding: "6px 12px" }}
                >
                  Ver más
                </Button>

                {authStatus && (
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => {
                      console.log("📦 Agregando producto:", article);
                      addToCart(article);
                      navigate("/cart");
                    }}
                  >
                    Agregar al carrito
                  </Button>
                )}
              </CardActions>
            </Card>
          ))}
        </Box>
      </Box>
    </>
  );
};

export default Store;
