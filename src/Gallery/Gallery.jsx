import React, { useState, useEffect } from 'react';
import './Gallery.css';
import TornadoImage from '../Images/Tornado.jpg';


function Gallery() {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className="gallery">
      <div className="background" style={{ backgroundImage: `url(${TornadoImage})`, transform: `translateY(${scrollY * 0.5}px)` }} />
      <div className="content">
        <h1>¡Bienvenido!</h1>
        <p>Este es el contenido de tu página.</p>
      </div>
    </div>
  );
}

export default Gallery;
