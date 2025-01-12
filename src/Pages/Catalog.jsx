import { CardActionArea, CardContent, CircularProgress, Typography, Button, Grid2 } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import Pagination from '@mui/material/Pagination';
import PaginationItem from '@mui/material/PaginationItem';
import Stack from '@mui/material/Stack';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

const Catalog = () => {
  const [animales, setAnimales] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);

  const itemsPerPage = 12; 

  useEffect(() => {
    const fetchAnimales = async () => {
      try {
        const response = await fetch('https://huachitos.cl/api/animales');
        if (!response.ok) {
          throw new Error('Error al obtener los datos');
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
      <Grid2
        container
        alignItems="center"
        justifyContent="center"
        sx={{ minHeight: '100vh' }}
      >
        <CircularProgress />
        <h2>Cargando animales...</h2>
      </Grid2>
    );
  }

  if (error) return <div>Error: {error}</div>;

  return (
    <div style={{ padding: '20px' }}>
      <h1>Animales en Adopción</h1>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
          gap: '20px',
        }}
      >
        {currentAnimales.map((animal) => (
          <div
            key={animal.id}
            style={{
              border: '1.5px solid rgba(100, 96, 96, 0.85)',
              borderRadius: '8px',
              padding: '10px',
              textAlign: 'justify',
              color: 'rgb(36, 35, 37, 0.84)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <CardActionArea>
              <img
                src={animal.imagen}
                alt={animal.nombre}
                style={{
                  width: '100%',
                  height: '150px',
                  objectFit: 'cover',
                  borderRadius: '8px',
                }}
              />
              <div
                style={{
                  marginTop: '10px',
                  display: 'flex',
                  justifyContent: 'center',
                  width: '100%',
                }}
              >
                <Button
                  size="small"
                  variant="contained"
                  href="#contained-buttons"
                  component={Link}
                  to={`/catalog/${animal.id}`}
                  state={{ animal }}
                >
                  Más Información
                </Button>
              </div>
              <CardContent>
                <Typography>
                  <h4>ID: {animal.id} - {animal.tipo}</h4>
                  <h4>Nombre: {animal.nombre}</h4>
                  <h4>Comuna: {animal.comuna}</h4>
                  <h4>Edad: {animal.edad}</h4>
                </Typography>
              </CardContent>
            </CardActionArea>
          </div>
        ))}
      </div>

      <Stack spacing={2} style={{ marginTop: '20px', alignItems: 'center' }}>
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
