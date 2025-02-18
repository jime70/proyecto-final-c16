import "./App.css";
import Gallery from "./Gallery/Gallery";
import Carousel from "./Components/Carousel";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { Button, CardMedia, Grid2 } from "@mui/material";
import adopcion from "./Images/adopcion.png";
import juguetes from "./Images/juguetes.png";
import entrenamiento from "./Images/entrenamiento.jpg";
import { Link } from "react-router-dom";
import Donations from "./Components/Donations";

function App() {
  return (
    <>
      <Gallery />
      <Box className="sample" marginTop="3rem" marginBottom="1rem">
        <h2>Formas de ayudar a nuestros Huachitos</h2>
        <p className="read-the-docs">
          Te invitamos a formar parte de nuestra misión apoyando con alguna de
          estas acciones y contribuirás directamente al bienestar de los
          animales rescatados, brindándoles una mejor calidad de vida.
        </p>

        <Grid2 container spacing={3} justifyContent="center">
          <Grid2 item xs={12} sm={6} md={4}>
            <Card sx={{ maxWidth: 345, margin: "auto" }}>
              <CardMedia
                component="img"
                height="250"
                image={adopcion}
                alt="rescate"
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  Adopta un animal
                </Typography>
                <Typography variant="body2">
                  Encuentra un animal en adopción y ayúdalo a encontrar un hogar
                  seguro y benéfico.
                </Typography>
                <Button
                  variant="contained"
                  component={Link}
                  to="/formulario"
                  sx={{
                    mt: 2,
                    borderRadius: 15,
                    display: "block",
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

          <Grid2 item xs={12} sm={6} md={4}>
            <Card sx={{ maxWidth: 345, margin: "auto" }}>
              <CardMedia
                component="img"
                height="250"
                image={juguetes}
                alt="rescate"
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  Juguetes y comida
                </Typography>
                <Typography variant="body2">
                  Compra juguetes y comida para animales en adopción.
                </Typography>
                <Button
                  variant="contained"
                  component={Link}
                  to="/store"
                  sx={{
                    mt: 2,
                    borderRadius: 15,
                    display: "block",
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

          <Grid2 item xs={12} sm={6} md={4}>
            <Card sx={{ maxWidth: 345, margin: "auto" }}>
              <CardMedia
                component="img"
                height="250"
                image={entrenamiento}
                alt="rescate"
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  Entrenamiento Básico
                </Typography>
                <Typography variant="body2">
                  Aprende a entrenar a animales en adopción para mejorar su
                  calidad de vida.
                </Typography>
                <Button
                  variant="contained"
                  component={Link}
                  to="/store"
                  sx={{
                    mt: 2,
                    borderRadius: 15,
                    display: "block",
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
        </Grid2>
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
}

export default App;
