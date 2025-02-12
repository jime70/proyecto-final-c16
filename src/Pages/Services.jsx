import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import CardActionArea from "@mui/material/CardActionArea";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Grupo from "../Images/grupo.jpg";
import Adopcion from "../Images/adopcion.png";
import Rescate from "../Images/rescate.png";
import Entrenamiento from "../Images/entrenamiento.jpg";
import { Grid2 } from "@mui/material";


const servicios = [
  {
    titulo: "Información sobre Adopción",
    descripcion: "Todo lo que necesitas saber para adoptar una mascota y darle un hogar.",
    imagen: Adopcion,
  },
  {
    titulo: "Rescate y Cuidado",
    descripcion: "Apoyamos el rescate y cuidado de animales en situación de calle.",
    imagen: Rescate,
  },
  {
    titulo: "Entrenamiento",
    descripcion: "Mejoramos la convivencia con entrenamiento positivo para tu mascota.",
    imagen: Entrenamiento,
  },
];

export default function ActionAreaCard() {
  return (
    <Box sx={{ padding: 6, textAlign: "center", marginTop: 5 }}>
      <Typography variant="h2" sx={{ marginBottom: 2 }}>
        Nuestros Servicios
      </Typography>

      {/* ✅ Tarjeta principal */}
      <Card sx={{ width: "100%", margin: "auto" }}>
        <CardActionArea>
          <CardMedia
            component="img"
            sx={{ maxHeight: 300, objectFit: "cover" }}
            image={Grupo}
            alt="Max"
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              El Cuidado Adecuado
            </Typography>
            <Typography
              variant="body2"
              textAlign="justify"
              sx={{ color: "text.secondary" }}
            >
              Sabemos lo difícil que puede ser confiar el cuidado de tu perro o
              gato a alguien más, porque para ti es más que una mascota: es
              parte de tu familia. Por eso, hemos creado una serie de servicios
              pensados para ayudarte a brindarle bienestar y mejorar su
              convivencia contigo. Nuestro objetivo es que vivan juntos de la
              mejor manera posible, con el apoyo de profesionales que aman tanto
              a los animales como tú. Si estás en la Región Metropolitana,
              podemos atenderte en comunas como Las Condes, Ñuñoa y La Reina, y
              si necesitas en otro lugar, pregúntanos y vemos cómo podemos
              ayudarte. Además, nuestros servicios online y ventas están
              disponibles para todo el país con previa coordinación.
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>

      <Typography variant="h3" sx={{ marginTop: 3, marginBottom: 2 }}>
        Más información sobre nuestros servicios
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
                <Typography variant="body2" sx={{ color: "text.secondary" }}>
                  {servicio.descripcion}
                </Typography>
              </CardContent>
              <CardActions>
                <Button size="small" variant="contained" color="primary">
                  Más información
                </Button>
              </CardActions>
            </Card>
          </Grid2>
        ))}
      </Grid2>
    </Box>
  );
}
