import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  CircularProgress,
  Button,
  Box,
  CardActionArea,
} from "@mui/material";
import { Link } from "react-router-dom";

const getValidImageUrl = (pic) => {
  if (pic.includes("drive.google.com")) {
    const driveId = pic.split("/d/")[1]?.split("/")[0];
    return `https://drive.google.com/uc?export=view&id=${driveId}`;
  }
  return pic;
};

const Store = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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
    <Box padding="2rem">
      <Typography
        variant="h3"
        textAlign="center"
        padding="2"
        marginBottom="2rem"
        sx={{
          color: "text.secondary",
          marginTop: "6rem",
          fontFamily: "sans-serif",
          fontWeight: "bold",
        }}
      >
        Tienda de Productos
      </Typography>
      <Box
        display="grid"
        gridTemplateColumns="repeat(auto-fill, minmax(250px, 1fr))"
        gap="20px"
      >
        {articles.map((article) => (
          <Card
            key={article._id}
            style={{
              border: "1.5px solid rgba(100, 96, 96, 0.85)",
              borderRadius: "8px",
              padding: "10px",
              textAlign: "justify",
              color: "rgb(36, 35, 37, 0.84)",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
            sx={{ padding: "10px" }}
          >
            <CardActionArea>
              <img
                src={getValidImageUrl(article.pic)}
                alt={article.name}
                style={{
                  width: "100%",
                  height: "150px",
                  objectFit: "cover",
                  borderRadius: "8px",
                }}
              />
              <div
                style={{
                  marginTop: "10px",
                  display: "flex",
                  justifyContent: "center",
                  width: "100%",
                }}
              ></div>
              <CardContent>
                <Typography variant="h6">ID: {article._id}</Typography>
                <Typography variant="h6">{article.name}</Typography>
                <Typography>Precio: ${article.price}</Typography>

                <Button
                  variant="contained"
                  color="primary"
                  component={Link}
                  to={`/store/${article._id}`} // Enlace al detalle del artículo
                  state={{ article }}
                >
                  Ver más
                </Button>
              </CardContent>
            </CardActionArea>
          </Card>
        ))}
      </Box>
    </Box>
  );
};

export default Store;
