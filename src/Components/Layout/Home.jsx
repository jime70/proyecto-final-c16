import React from "react";
import Gallery from "../../Gallery/Gallery";
import Carousel from "../Carousel/Carousel";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { Button, CardMedia } from "@mui/material";
import Grid2 from "@mui/material/Grid2";
import { Link } from "react-router-dom";
import Donations from "../Donations";
import adopcion from "../../Images/adopcion.png";
import juguetes from "../../Images/juguetes.png";
import entrenamiento from "../../Images/entrenamiento.jpg";

const cardData = [
  {
    image: adopcion,
    title: "Adopta un animal",
    description:
      "Encuentra un animal en adopción y ayúdalo a encontrar un hogar seguro y benéfico.",
    link: "/formulario",
  },
  {
    image: juguetes,
    title: "Juguetes y comida",
    description: "Compra juguetes y comida para animales en adopción.",
    link: "/store",
  },
  {
    image: entrenamiento,
    title: "Entrenamiento Básico",
    description:
      "Aprende a entrenar a animales en adopción para mejorar su calidad de vida.",
    link: "/store",
  },
];

const Home = () => {
  const [selectedCard, setSelectedCard] = React.useState(null);

  return (
    <>
      <Gallery />
      <Box
        marginTop="3rem"
        marginBottom="1rem"
        textAlign="center"
        sx={{
          width: "100%",
          paddingX: "2rem",
        }}
      >
        <Typography variant="h4" sx={{ marginBottom: "1rem" }}>
          Formas de ayudar a nuestros Huachitos
        </Typography>
        <Typography variant="body1" sx={{ marginBottom: "2rem" }}>
          Te invitamos a formar parte de nuestra misión apoyando con alguna de
          estas acciones y contribuirás directamente al bienestar de los
          animales rescatados, brindándoles una mejor calidad de vida.
        </Typography>

        <Grid2 container spacing={3} justifyContent="center">
          {cardData.map((card, index) => (
            <Grid2
              
              xs={12}
              sm={6}
              md={4}
              key={index}
              display="flex"
              justifyContent="center"
            >
              <Card
                onClick={() => setSelectedCard(index)}
                sx={{
                  minWidth: 280,
                  maxWidth: 320,
                  width: "100%",
                  height: "100%",
                  backgroundColor: selectedCard === index ? "#E3E8FF" : "white",
                  transition: "background-color 0.3s ease",
                  "&:hover": {
                    backgroundColor: "#C9D3FF",
                  },
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  textAlign: "center",
                  padding: 2,
                  boxShadow: "0px 4px 10px rgba(26, 14, 71, 0.1)",
                  marginBottom: "10px",
                }}
              >
                <CardMedia
                  component="img"
                  image={card.image}
                  alt={card.title}
                  sx={{
                    borderRadius: "50%",
                    width: "180px",
                    height: "180px",
                    objectFit: "cover",
                    boxShadow: "2px 4px 20px rgba(105, 102, 102, 0.3)",
                    margin: "auto",
                  }}
                />
                <CardContent
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Typography gutterBottom variant="h6" component="div">
                    {card.title}
                  </Typography>
                  <Typography variant="body2">{card.description}</Typography>
                  <Button
                    variant="contained"
                    component={Link}
                    to={card.link}
                    sx={{
                      mt: 2,
                      borderRadius: 15,
                      textAlign: "center",
                      backgroundColor: "#A9B5DF",
                      color: "black",
                      "&:hover": { backgroundColor: "#8FA58D", color: "white" },
                    }}
                  >
                    Ver más
                  </Button>
                </CardContent>
              </Card>
            </Grid2>
          ))}
        </Grid2>

        <Box sx={{ marginBottom: "3rem" }}></Box>
      </Box>

      <Donations />

      <Carousel />

      <Box display="flex" justifyContent="center">
        <Button
          variant="contained"
          component={Link}
          to="/information"
          sx={{
            mt: 2,
            width: "20%",
            borderRadius: 15,
            justifyContent: "center",
            alignItems: "center",
            marginBottom: 10,
            backgroundColor: "#A9B5DF",
            color: "black",
            "&:hover": { backgroundColor: "#8FA58D", color: "white" },
          }}
        >
          Sobre Nosotros
        </Button>
      </Box>
    </>
  );
};

export default Home;
