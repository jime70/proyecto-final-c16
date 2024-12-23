import { Typography, Container } from '@mui/material';
import React from 'react';
import { useLocation } from 'react-router-dom';

export const CatalogDetail = () => {
  const location = useLocation();
  const animal = location.state?.animal;

  if (!animal) {
    return <div>No se encontró la información del animal.</div>;
  }

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        {animal.nombre}
      </Typography>
      <img
        src={animal.imagen}
        alt={animal.nombre}
        style={{ width: '50%', borderRadius: '8px' }}
      />
      <Typography variant="body1" style={{ marginTop: '20px' }}>
        Tipo: {animal.tipo}
      </Typography>
      <Typography variant="body1">Comuna: {animal.comuna}</Typography>
      <Typography variant="body1">Edad: {animal.desc_fisica}</Typography>
      <Typography variant="body1">Edad: {animal.desc_personalidad}</Typography>
      <Typography variant='body1'>Imagenes: {animal.url}</Typography>
    </Container>
  );
};
