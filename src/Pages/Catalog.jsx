import "./Catalog.css";

import {
  CardActionArea,
  CardContent,
  CircularProgress,
  Typography,
  Button,
  Box,
} from "@mui/material";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Pagination from "@mui/material/Pagination";
import PaginationItem from "@mui/material/PaginationItem";
import Stack from "@mui/material/Stack";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

const Catalog = () => {
  const [animales, setAnimales] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);

  const itemsPerPage = 12;

  useEffect(() => {
    const fetchAnimales = async () => {
      try {
        const response = await fetch("https://huachitos.cl/api/animales");
        if (!response.ok) {
          throw new Error("Error al obtener los datos");
        }
        const respuestaData = await response.json();
        setAnimales(respuestaData.data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchAnimales();
  }, []);

  const [searchTerm, setSearchTerm] = useState("");
  const onSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const totalPages = Math.ceil(animales.length / itemsPerPage);
  const currentAnimales = animales.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  );

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  if (loading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="100vh"
      >
        <CircularProgress />
        <h2>Cargando animales...</h2>
      </Box>
    );
  }

  if (error) return <div>Error: {error}</div>;

  return (
    <div className="catalog-container">
      <Typography
        variant="h3"
        textAlign="center"
        padding="2"
        sx={{
          color: "text.secondary",
          marginTop: "6rem",
          fontFamily: "sans-serif",
          fontWeight: "bold",
        }}
      >
        Animales en Adopción
      </Typography>
      <Box className="catalog-description">
        <p>
          Adoptar un animal no solo transforma su vida, sino que también aporta
          felicidad y compañía a la tuya. Brindar un hogar a un animal rescatado
          ayuda a reducir el número de animales en situación de calle y fomenta
          una cultura de respeto y cuidado hacia ellos. ¡Te invitamos a hacer la diferencia
          adoptando con amor!
        </p>
      </Box>

      <input
        type="text"
        placeholder="Buscar por nombre o especie..."
        onChange={onSearch}
      />
      <button>Buscar</button>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
          gap: "20px",
        }}
      >
        {currentAnimales.map((animal) => (
          <div
            key={animal.id}
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
          >
            <CardActionArea>
              <img
                src={animal.imagen}
                alt={animal.nombre}
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
              >
                <Button
                  size="small"
                  variant="contained"
                  component={Link}
                  to={`/catalog/${animal.id}`}
                  state={{ animal }}
                >
                  Más Información
                </Button>
              </div>
              <CardContent>
                <Typography>
                  <h4>
                    ID: {animal.id} - {animal.tipo}
                  </h4>
                  <h4>Nombre: {animal.nombre}</h4>
                  <h4>Comuna: {animal.comuna}</h4>
                  <h4>Edad: {animal.edad}</h4>
                </Typography>
              </CardContent>
            </CardActionArea>
          </div>
        ))}
      </div>

      <Stack spacing={2} style={{ marginTop: "20px", alignItems: "center" }}>
        <Pagination
          count={totalPages}
          page={page}
          onChange={handlePageChange}
          renderItem={(item) => (
            <PaginationItem
              slots={{ previous: ArrowBackIcon, next: ArrowForwardIcon }}
              {...item}
            />
          )}
        />
      </Stack>
    </div>
  );
};

export default Catalog;
