import { useEffect, useState } from "react";
import { Typography, Card, CardActionArea, CardContent, Button, Box, CircularProgress } from "@mui/material";
import { useParams, useLocation, Link } from "react-router-dom";

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
  const [article, setArticle] = useState(location.state?.article || null);
  const [loading, setLoading] = useState(!article); 
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!article) {
      const fetchArticle = async () => {
        try {
          const response = await fetch(`http://localhost:3003/api/articles/readone/${id}`);
          if (!response.ok) throw new Error("Error al obtener los detalles del artículo");
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

  console.log("Datos del artículo:", article); // Muestra los datos en la consola


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
        <Typography variant="h6">No se encontró la información, por favor verifique los datos.</Typography>
      </Box>
    );
  }

  return (
    <Box textAlign="center" padding="2rem">
      <Card sx={{ maxWidth: 500, padding: 5, margin: "auto", marginTop: "20px" }}>
        <CardActionArea>
          <CardContent>
            <Typography variant="h4" gutterBottom>
              {article.name}
            </Typography>

            <Box display="flex" justifyContent="center" marginBottom="20px">
              <img
                src={getValidImageUrl(article.pic)}
                alt={article.name}
                style={{
                  width: "80%",
                  height: "auto",
                  borderRadius: "10px",
                  objectFit: "cover",
                }}
              />
            </Box>

            <Typography variant="h6">ID: {article._id}</Typography>
            <Typography variant="body1" style={{ marginBottom: "10px" }}>
              <strong>Nombre:</strong> {article.name}
            </Typography>
            <Typography variant="body1" style={{ marginBottom: "10px" }}>
              <strong>Tamaño:</strong> {article.size}
            </Typography>
            <Typography variant="body1" style={{ marginBottom: "10px" }}>
              <strong>Descripción:</strong> {article.description}
            </Typography>
            <Typography variant="body1" style={{ marginBottom: "10px" }}>
              <strong>Precio:</strong> ${article.price}
            </Typography>

            <Button
              variant="contained"
              color="primary"
              component={Link}
              to={`/store`}
              sx={{ marginTop: 2 }}
            >
              Regresar a la Tienda
            </Button>
          </CardContent>
        </CardActionArea>
      </Card>
    </Box>
  );
};

export default StoreDetail;
