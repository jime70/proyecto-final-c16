import { Typography, Card, CardActionArea, CardContent, Button, Box } from '@mui/material';
import React from 'react';
import { useLocation } from 'react-router-dom';
import { Link } from "react-router-dom";

export const CatalogDetail = () => {
  const location = useLocation();
  const animal = location.state?.animal;

  if (!animal) {
    return <div>No se encontró la información del animal.</div>;
  }

  return (
    <Box > 
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        padding: '20px', 
      }}
    >
      <Card sx={{ maxWidth: 500, padding: 5, marginTop: '20px' }}> 
        <CardActionArea>
          <CardContent>
            <Typography variant="h4" gutterBottom>
              {animal.nombre}
            </Typography>

            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '20px' }}>
              <img
                src={animal.imagen}
                alt={animal.nombre}
                style={{
                  height: '50%',
                  width: '50%',
                  borderRadius: '10px',
                }}
              />
            </div>

            <Typography variant="body1" style={{ marginBottom: '10px' }}>
              Tipo: {animal.tipo}
            </Typography>
            <Typography variant="body1" style={{ marginBottom: '10px' }}>
              Comuna: {animal.comuna}
            </Typography>
            <Typography variant="body1" style={{ marginBottom: '10px' }}>
              Descripción Física: {animal.desc_fisica}
            </Typography>
            <Typography variant="body1" style={{ marginBottom: '10px' }}>
              Descripción Personalidad: {animal.desc_personalidad}
            </Typography>
            <Typography variant="body1" style={{ marginBottom: '20px' }}>
              Imágenes: {animal.url}
            </Typography>

            <Button variant="contained" href="#contained-buttons"
            component={Link}
            to={`/formulario`}
            state={{ animal }}>
              Adopción
            </Button>
          </CardContent>
        </CardActionArea>
      </Card>
    </div>
    </Box>
  );
};
