import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";
import {
  Grid2,
  Card,
  CardMedia,
  CardContent,
  CardActionArea,
  FormControlLabel,
  Radio,
  RadioGroup,
  Modal,
} from "@mui/material";
import adopcion from "../Images/adopcion.png";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function UserForm() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("Formulario enviado");
    handleOpen();
  };

  return (
    <>
      
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "flex-start",
          padding: "15px",
          marginTop: "60px",
          width: "100%",
        }}
      >
        <Grid2 item xs={12} sm={6} md={4}>
          <Card sx={{ maxWidth: 500 }}>
            <CardActionArea>
              <CardMedia
                component="img"
                height="340"
                image={adopcion}
                alt="adopciones"
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  Previo a la adopción
                </Typography>
                <Typography variant="body2" sx={{ color: "text.secondary" }}>
                  Adoptar una mascota es un paso muy importante. Queremos
                  asegurarnos de que elijas la mascota correcta según tus
                  necesidades y estilo de vida. Completa este formulario y nos
                  contactaremos contigo para agendar una entrevista y elegir la
                  mascota ideal para ti.
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </Grid2>

        <Box
          component="form"
          sx={{
            "& .MuiTextField-root": { m: 2, width: "100%" },
            maxWidth: "800px", 
            margin: "auto",
            padding: 3,
            border: "2px solid #ccc",
            borderRadius: "10px",
          }}
          onSubmit={handleSubmit}
          noValidate
          autoComplete="off"
        >
          <h2 style={{ textAlign: "center", marginTop: "10px" }}>
            Formulario de Contacto
          </h2>

          <div style={{ display: "flex", gap: "15px" }}>
            <TextField id="outlined-name" label="Nombre" placeholder="Ej: Juan" inputProps={{ maxLength: 25 }} sx={{ width: "50%" }} />
            <TextField id="outlined-lastname" label="Apellido" placeholder="Ej: Pérez" inputProps={{ maxLength: 25 }} sx={{ width: "50%" }} />
          </div>

          <div style={{ display: "flex", gap: "15px" }}>
            <TextField id="outlined-identification" label="RUT/DNI sin puntos y con dígito verificador" placeholder="Ej: 11111111-1" inputProps={{ maxLength: 25 }} sx={{ width: "50%" }} />
            <TextField id="outlined-phone" label="Teléfono" placeholder="Ej: +56 9 9999 9999" inputProps={{ maxLength: 25 }} sx={{ width: "50%" }} />
          </div>

          <div style={{ display: "flex", gap: "15px" }}>
            <TextField id="outlined-city" label="Ciudad/Comuna" placeholder="Ej: La Reina" inputProps={{ maxLength: 25 }} sx={{ width: "50%" }} />
            <TextField id="outlined-region" label="Región" placeholder="Ej: Región Metropolitana" inputProps={{ maxLength: 25 }} sx={{ width: "50%" }} />
          </div>

          <TextField id="outlined-address" label="Dirección" placeholder="Ej: Av. Siempre Viva 123, Springfield" />
          <TextField id="outlined-email" label="E-mail de contacto" placeholder="Ej: jperez@gmail.com" />

          <h3>A continuación seleccione la casilla que corresponda</h3>

          <h4>Descripción de su residencia</h4>
          <RadioGroup>
            <FormControlLabel value="casa_amplia" control={<Radio />} label="Casa con patio amplio" />
            <FormControlLabel value="casa_pequeña" control={<Radio />} label="Casa con patio pequeño" />
            <FormControlLabel value="departamento" control={<Radio />} label="Departamento" />
          </RadioGroup>

          <h4>¿Actualmente cuenta con otra mascota?</h4>
          <RadioGroup>
            <FormControlLabel value="si" control={<Radio />} label="Sí" />
            <FormControlLabel value="no" control={<Radio />} label="No" />
          </RadioGroup>

          <h4>¿Qué tamaño de mascota desea adoptar?</h4>
          <RadioGroup>
            <FormControlLabel value="grande" control={<Radio />} label="Grande" />
            <FormControlLabel value="mediana" control={<Radio />} label="Mediana" />
            <FormControlLabel value="pequeña" control={<Radio />} label="Pequeña" />
            <FormControlLabel value="sin_preferencia" control={<Radio />} label="No tiene exigencia del tamaño" />
          </RadioGroup>

          <h4>¿Qué comportamiento desea en su mascota?</h4>
          <RadioGroup>
            <FormControlLabel value="amigable" control={<Radio />} label="Amigable" />
            <FormControlLabel value="sociable" control={<Radio />} label="Sociable" />
            <FormControlLabel value="calmado" control={<Radio />} label="Calmado" />
            <FormControlLabel value="sin_preferencia" control={<Radio />} label="No tiene exigencia del comportamiento" />
          </RadioGroup>

          <h4>Motivo para adoptar</h4>
          <TextField id="outlined-comments" label="Comentarios" placeholder="Escriba sus comentarios aquí" multiline rows={6} sx={{ width: "100%" }} />

          <Button
            variant="contained"
            color="primary"
            type="submit"
            sx={{ margin: "16px 0", width: "100%" }}
          >
            Enviar
          </Button>
        </Box>

        <Modal open={open} onClose={handleClose}>
          <Box sx={style}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Formulario enviado con éxito
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              Gracias por contactarnos. Nos pondremos en contacto contigo
              pronto.
            </Typography>
            
            <Button
              onClick={handleClose} variant="contained" sx={{
                mt: 2,
                display: "block",
                marginLeft: "auto",
                marginRight: "auto",
                backgroundColor: "#b8c9d6",
                color: "black",
              }}
            >
              Volver a Formulario
            </Button>
            <Button
              variant="contained"
              color="success"
              component={Link}
              to="/catalog"
              sx={{
                mt: 2,
                display: "block",
                textAlign: "center",
              }}
            >
              Regresar al Catálogo
            </Button>
          </Box>
        </Modal>
        </Box>
    </>
  );
}
