import React, { useState, useEffect } from "react";
import "./Gallery.css";
import TornadoImage from "../Images/Tornado.jpg";
import Box from "@mui/material/Box";
import { Card, CardContent, Typography } from "@mui/material";

function Gallery() {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <Box display={"flex"} marginTop={"5%"}>
      <div className="gallery">
        <div
          className="background"
          style={{
            backgroundImage: `url(${TornadoImage})`,
            transform: `translateY(${scrollY * 0.5}px)`,
          }}
        />
        <Card
          sx={{
            width: '70%',
            padding: 2,
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            boxShadow: 3,
            background: "none", 
           
          }}
        >
          <CardContent>
            <Typography gutterBottom variant="h1" component="div" color="white" 
            sx={{ 
              fontSize: "70px", 
              fontWeight: "bold",
              fontStyle: "italic",
              fontFamily: "Helvetica, sans-serif"
              }}>
              Bienvenido a Huachitos
            </Typography>
            <Typography variant="body2" color="white" sx={{ fontSize: "30px" }}>
              Somos una organización comprometida con el rescate de mascotas para darles la calidad de vida que merecen. 
            </Typography>
          </CardContent>
        </Card>
      </div>
    </Box>
  );
}

export default Gallery;
