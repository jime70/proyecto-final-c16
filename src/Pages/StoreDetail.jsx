import { useContext, useEffect, useState } from "react";
import { useParams, useLocation, Link, useNavigate } from "react-router-dom";
import {
  Typography,
  Card,
  CardContent,
  Button,
  Box,
  CircularProgress,
  CardMedia,
} from "@mui/material";
import ClientContext from "../contexts/clients/ClientContext";
import CartContext from "../contexts/Cart/CartContext";
import axios from "axios"

const getValidImageUrl = (pic) => {
  if (!pic) return "";
  if (pic.includes("drive.google.com")) {
    const driveId = pic.split("/d/")[1]?.split("/")[0];
    return `https://drive.google.com/uc?export=view&id=${driveId}`;
  }
  return pic;
};

const StoreDetail = () => {
  console.log("🚀 StoreDetail se está renderizando");
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const { client, authStatus } = useContext(ClientContext);
  const { addToCart } = useContext(CartContext);

  const [article, setArticle] = useState(location.state?.article || null);
  const [loading, setLoading] = useState(!article);
  const [error, setError] = useState(null);

  const productToBack = {
    productName: article.title,
    productDescription: article.description,
    productPrice: article.price,
    productQuantity: 1,
    imageUrl: article.image,
    currency: "CLP",
    line_items: [
      {
        price: article.price,
        quantity: 1,
        name: article.title,
      },
    ],
  };

  const handleSendToBack = async () => {
    try {
      const backendUrl = import.meta.env.VITE_BACKEND_URL;
      const response = await axios.post(
        `${backendUrl}/payment/create-checkout-session`,
        productToBack 
      );
      if (response.data && response.data.url) {
        window.location.href = response.data.url;
      } else {
        console.error("Error creating checkout session");
      }
    }
    catch (err) {
      console.error("Error al enviar al carrito de regreso", err);
    }
  }
  

  useEffect(() => {
    if (!article) {
      const fetchArticle = async () => {
        try {
          const response = await fetch(
            `http://localhost:3003/api/articles/readone/${id}`
          );
          if (!response.ok)
            throw new Error("Error al obtener los detalles del artículo");
          const data = await response.json();
          setArticle(data);
        } catch (err) {
          setError(err.message);
        } finally {
          setLoading(false);
        }
      };
      fetchArticle();
    }
  }, [article, id]);

  if (loading) {
    return (
      <Box textAlign="center" padding="2rem">
        <CircularProgress />
        <Typography variant="h6" style={{ marginTop: "20px" }}>
          Cargando detalles del producto...
        </Typography>
      </Box>
    );
  }

  if (error) {
    return (
      <Box textAlign="center" padding="2rem">
        <Typography variant="h6" style={{ color: "red" }}>
          Error: {error}
        </Typography>
      </Box>
    );
  }

  if (!article) {
    return (
      <Box textAlign="center" padding="2rem">
        <Typography variant="h6">
          No se encontró la información, por favor verifique los datos.
        </Typography>
      </Box>
    );
  }

  return (
    <Box
      textAlign="center"
      padding="2rem"
      sx={{ display: "flex", justifyContent: "center", mt: 8 }}
    >
      <Card
        sx={{
          display: "flex",
          flexDirection: "column",
          maxWidth: 500,
          borderRadius: 2,
          boxShadow: 3,
          p: 2,
        }}
      >
        {/* Sección superior con imagen y detalles */}
        <Box sx={{ display: "flex" }}>
          {/* Imagen a la izquierda */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: "40%",
            }}
          >
            <CardMedia
              component="img"
              sx={{ width: 200, objectFit: "cover" }}
              image={getValidImageUrl(article.pic)}
              alt={article.name}
              style={{
                width: "80%",
                height: "auto",
                borderRadius: "10px",
                objectFit: "cover",
              }}
            />
          </Box>

          {/* Detalles a la derecha */}
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              width: "60%",
            }}
          >
            <CardContent>
              <Typography variant="h6" fontWeight="bold">
                ID: {article._id.slice(-6)}
              </Typography>
              <Typography
                variant="body1"
                style={{ marginBottom: "10px" }}
                color="text.secondary"
              >
                <strong>Nombre:</strong> {article.name}
              </Typography>
              <Typography variant="body1" style={{ marginBottom: "10px" }}>
                <strong>Tamaño:</strong> {article.size}
              </Typography>
              <Typography variant="body1" style={{ marginBottom: "10px" }}>
                <strong>Descripción:</strong> {article.description}
              </Typography>
              <Typography variant="body1">
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
          </Box>
        </Box>

        <Box
          sx={{ display: "flex", justifyContent: "space-between", mt: 2, p: 2 }}
        >
          <Button
            variant="contained"
            color="primary"
            component={Link}
            to={`/store`}
          >
            Regresar a la Tienda
          </Button>
          {authStatus && (
            <Button
              variant="contained"
              color="secondary"
              onClick={handleSendToBack}
              // variant="contained"
              // color="secondary"
              // onClick={() => {
              //   console.log("🛒 Agregando desde StoreDetail:", article);
              //   addToCart(article);
              //   navigate("/cart"); // Redirigir al carrito
              // }}
            >
              Comprar
            </Button>
          )}
        </Box>
      </Card>
    </Box>
  );
};

export default StoreDetail;
