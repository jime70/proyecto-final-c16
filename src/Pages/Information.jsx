import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import CardActionArea from "@mui/material/CardActionArea";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import fundacion from "../Images/fundacion.jpg";
import Grid2 from "@mui/material/Grid2";
import InstagramIcon from "@mui/icons-material/Instagram";
import FacebookIcon from "@mui/icons-material/Facebook";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";

import testimonio1 from "../Images/testimonio1.jpeg";
import testimonio2 from "../Images/testimonio2.jpg";
import testimonio3 from "../Images/testimonio3.jpg";
import woman from "../Images/woman.jpg";
import man from "../Images/man.jpg";

const servicios = [
  {
    titulo: "Familia Pérez - Milo",
    descripcion:
      '"Desde el momento que lo vimos, supimos que era parte de nuestra familia. Milo llegó a alegrar nuestros días con sus juegos y energía. Es la compañía perfecta para los niños."',
    imagen: testimonio1,
  },
  {
    titulo: "Claudia Noir - Luna",
    descripcion:
      '"Siempre supe que cuando tuviera mi casa propia, adoptaría una mascota. Todo se dio perfecto para llegar hasta acá, mi trabajo, mi casa y ahora mi Luna. Estoy feliz."',
    imagen: testimonio2,
  },
  {
    titulo: "Felix Gomez - Tine",
    descripcion:
      ' "Después de mi separación, me cambié de región, pero algo faltaba. Un amigo me invitó a una jornada de adopción, ahí fue donde conocí a Tine y no nos hemos separado desde entonces."',
    imagen: testimonio3,
  },
];

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
  ...theme.applyStyles("dark", { backgroundColor: "#1A2027" }),
}));

export default function ActionAreaCard() {
  return (
    <Box sx={{ padding: 6, textAlign: "center", marginTop: 5 }}>
      <Typography variant="h2" sx={{ marginBottom: 2 }}>
        Quienes Somos
      </Typography>

      <Card sx={{ width: "100%", margin: "auto" }}>
        <CardActionArea>
          <CardMedia
            component="img"
            sx={{ maxHeight: 300, objectFit: "cover" }}
            image={fundacion}
            alt="mascotas"
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              Una Gran Familia
            </Typography>
            <Typography
              variant="body2"
              textAlign="justify"
              sx={{ color: "text.secondary", fontSize: "15px" }}
            >
              Esta iniciativa nace de nuestra preocupación por la cantidad de
              animales abandonados que vemos todos los días y de nuestra
              comprensión de los retos a los que se enfrentan las personas,
              fundaciones y agrupaciones que rescatan animales. Estos retos
              incluyen la falta de visibilidad de los animales que tienen en
              adopción y la reincidencia en el abandono. Nuestra principal
              motivación es utilizar esta plataforma para conectar a tantos
              animales necesitados con hogares que los amen y cuiden. En
              Huachitos ofrecemos a fundaciones, organizaciones y rescatistas
              independientes la oportunidad de promocionar de forma gratuita a
              los animales que están bajo su cuidado esperando un hogar. Nuestro
              objetivo principal es facilitar la búsqueda de hogares para los
              animales rescatados y fomentar la tenencia y adopción
              responsables. Además, difundimos también los animales perdidos
              para ayudar en la reunificación con sus familias. Es importante
              que sepas que todos los animales listados en Huachitos son
              responsabilidad de las organizaciones, agrupaciones y rescatistas
              individuales que los publican. Te recomendamos ponerte en contacto
              con ellos para confirmar la disponibilidad del animal y obtener
              información adicional. ¡Únete y juntos hagamos del mundo un lugar
              mejor para los animales! Tu apoyo es fundamental para lograr un
              impacto positivo en la vida de los animales de nuestro país y
              reducir juntos el abandono.❤️
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>

      <Box sx={{ marginTop: 4 }}></Box>

      <Card sx={{ width: "100%", margin: "auto", padding: 2 }}>
        <CardContent>
          <Box sx={{ display: "flex", alignItems: "center", gap: 4 }}>
            <Box sx={{ flexShrink: 0 }}>
              <Card sx={{ maxWidth: 250 }}>
                <CardMedia
                  component="img"
                  image={woman}
                  alt="Karla"
                  sx={{ width: "100%", height: "auto", borderRadius: 2 }}
                />
              </Card>
            </Box>
            <Box sx={{ flex: 1 }}>
              <Typography variant="h5" sx={{ marginBottom: 2 }}>
                Hola, soy Karla.
              </Typography>
              <Typography variant="body1" textAlign="justify">
                Gracias a la flexibilidad de mi trabajo, he podido dedicar mi
                tiempo y esfuerzo a brindarles una segunda oportunidad a las
                mascotas en situación de abandono. Junto a un equipo increíble,
                fundamos esta organización con la misión de rescatar,
                rehabilitar y encontrar hogares amorosos para cada mascota que
                lo necesite.
              </Typography>
            </Box>
          </Box>
        </CardContent>
      </Card>

      <Box sx={{ marginTop: 4 }}></Box>

      <Card sx={{ width: "100%", margin: "auto", padding: 2 }}>
        <CardContent>
          <Box sx={{ display: "flex", alignItems: "center", gap: 4 }}>
            <Box sx={{ flex: 1 }}>
              <Typography variant="h5" sx={{ marginBottom: 2 }}>
                Hola, soy Rafael.
              </Typography>
              <Typography variant="body1" textAlign="justify">
                Soy cofundador de Fundación Huachitos, nuestro amor y compromiso
                a nuestra causa nos ha permitido extender nuestros esfuerzos a
                toda la Región Metropolitana, pero aún hay mucho por avanzar.
                Nuestros esfuerzos nos han permitido formar alianzas con otras
                fundaciones para poder proporcionar la ayuda adeuada incluso en
                tiempos de crisis. Creemos que cada vida cuenta y trabajamos con
                pasión para hacer la diferencia.
              </Typography>
            </Box>

            <Box sx={{ flexShrink: 0 }}>
              <Card sx={{ maxWidth: 250 }}>
                <CardMedia
                  component="img"
                  image={man}
                  alt="Rafael"
                  sx={{ width: "100%", height: "auto", borderRadius: 2 }}
                />
              </Card>
            </Box>
          </Box>
        </CardContent>
      </Card>

      <Box sx={{ marginTop: 4 }}></Box>

      <Typography
        variant="h3"
        fontFamily="fantasy"
        sx={{ marginTop: 3, marginBottom: 2 }}
      >
        Testimonios
      </Typography>

      <Grid2 container spacing={8} justifyContent="center">
        {servicios.map((servicio, index) => (
          <Grid2 item xs={12} sm={6} md={4} key={index}>
            <Card sx={{ maxWidth: 345, margin: "auto" }}>
              <CardMedia
                component="img"
                height="250"
                image={servicio.imagen}
                alt={servicio.titulo}
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {servicio.titulo}
                </Typography>
                <Typography variant="body2">{servicio.descripcion}</Typography>
              </CardContent>
            </Card>
          </Grid2>
        ))}
      </Grid2>

      <Box sx={{ display: "flex", justifyContent: "center", mt: 2, gap: 2 }}>
        <Typography>
          No olvides seguirnos en nuestras redes sociales.
        </Typography>

        <a
          href="https://www.instagram.com/huachitosapi/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <InstagramIcon sx={{ fontSize: 40, color: "#2D336B" }} />
        </a>

        <a
          href="https://www.facebook.com/?sk=welcome"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FacebookIcon sx={{ fontSize: 40, color: "#2D336B" }} />
        </a>
      </Box>
    </Box>
  );
}
