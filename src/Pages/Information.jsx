import * as React from "react";
import { Link } from "react-router-dom";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import CardActionArea from "@mui/material/CardActionArea";

import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Grupo from "../Images/grupo.jpg";
import Grid2 from "@mui/material/Grid2";

import testimonio1 from "../Images/testimonio1.jpeg";
import testimonio2 from "../Images/testimonio2.jpg";
import testimonio3 from "../Images/testimonio3.jpg";

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
            image={Grupo}
            alt="Max"
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              Una Gran Familia
            </Typography>
            <Typography
              variant="body2"
              textAlign="justify"
              sx={{ color: "text.secondary" }}
            >
              Fundación Huachitos nació como una forma de ayudar a muchas
              mascotas en situación de abandono. Lo que en un principio nació
              como un proyecto de medio tiempo, se convirtió en un compromiso
              con nuestros peludos amigos para rescatarlos de situaciones
              extremas, proporcionarles el cuidado adecuado, alimentarlos, y
              encontrarles un hogar definitivo que los acoja y los cuide.
              Nuestro compromiso comenzó extendiéndose a toda la zona de la
              Región Metropolitana, pero poco a poco hemos extendido nuestra
              misión a ayudar a familias de todo el país con nuestros
              asesoramientos online. A medida que crecemos, hemos podido firmar
              convenios con distintas instituciones, que nos permiten entregar
              cuidados médicos y de comida adecuados. En Fundación Huachitos
              creemos que cada mascota merece una segunda oportunidad y que, con
              amor y compromiso, podemos cambiar sus vidas. Sin embargo, nuestra
              labor no sería posible sin el apoyo de personas como tú. Puedes
              ayudarnos de muchas maneras: adoptando, siendo hogar temporal,
              donando alimentos o insumos médicos, o simplemente difundiendo n
              uestra causa. Juntos, podemos hacer la diferencia y brindarle a
              cada animalito el hogar que tanto necesita. Si quieres ser parte
              de este cambio, contáctanos y ayúdanos a seguir construyendo un
              futuro mejor para ellos.
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>

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
      <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
        <Typography>No olvides seguirnos en nuestras redes</Typography>
      </Box>

      <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
        <Typography>
          Te invitamos a ser parte de nuestra comunidad. Hazte socio acá
        </Typography>
      </Box>
    </Box>
  );
}
