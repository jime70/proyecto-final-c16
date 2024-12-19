import React, { useEffect, useState } from 'react';

const Catalog = () => {
  const [animales, setAnimales] = useState([]); 
  const [error, setError] = useState(null); 
  const [loading, setLoading] = useState(true); 

 
  useEffect(() => {
    const fetchAnimales = async () => {
      try {
        const response = await fetch('https://huachitos.cl/api/animales');
        if (!response.ok) {
          throw new Error('Error al obtener los datos');
        }
        const respuestaData = await response.json();
        console.log(respuestaData)
        setAnimales(respuestaData.data); 
      } catch (error) {
        setError(error.message); 
      } finally {
        setLoading(false); 
      }
    };

    fetchAnimales();
  }, []);

 
  if (loading) return <div>Cargando animales...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div style={{ padding: '20px' }}>
      <h1>Animales en Adopción</h1>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '20px' }}>
        {animales.map((animal) => (
          <div
            key={animal.id}
            style={{
              border: '1px solid #ddd',
              borderRadius: '8px',
              padding: '10px',
              textAlign: 'center',
            }}
          >
            <img
              src={animal.imagen}
              alt={animal.nombre}
              style={{ width: '100%', height: '150px', objectFit: 'cover', borderRadius: '8px' }}
            />
            <h2>{animal.nombre}</h2>
            <p>{animal.descripcion}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Catalog;
