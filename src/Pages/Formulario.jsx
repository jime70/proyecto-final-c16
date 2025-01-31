import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import Typography from "@mui/material/Typography"; // Asegúrate de importar Typography
import { Link } from "react-router-dom";

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
    handleOpen(); // Abre el modal después de enviar el formulario
  };

  return (
    <Box
      component="form"
      sx={{
        "& .MuiTextField-root": { m: 1, width: "100%" },
        maxWidth: 600,
        margin: "auto",
        padding: 2,
        border: "1px solid #ccc",
        borderRadius: "8px",
      }}
      onSubmit={handleSubmit}
      noValidate
      autoComplete="off"
    >
      <h2 style={{ textAlign: "center" }}>Formulario de Contacto</h2>
      <TextField id="name" label="Nombre" variant="outlined" required />
      <TextField id="telephone" label="Teléfono" variant="outlined" required />
      <TextField
        id="email"
        label="Correo Electrónico"
        variant="outlined"
        type="email"
        required
      />
      <TextField
        id="comment"
        label="Coméntanos a quién quieres adoptar y agendaremos una entrevista contigo."
        variant="outlined"
        multiline
        rows={4}
        required
      />
      <Button
        variant="contained"
        color="primary"
        type="submit"
        sx={{ margin: "16px 0", width: "100%" }}
      >
        Enviar
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Formulario enviado con éxito
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Gracias por contactarnos. Nos pondremos en contacto contigo pronto.
          </Typography>
          <Button
            onClick={handleClose}
            variant="contained"
            sx={{
              mt: 2,
              display: "block",
              marginLeft: "auto",
              marginRight: "auto",
              backgroundColor: '#b8c9d6',
              color: 'black'
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
              textAlign: 'center'
            }}
          >
            Regresar al Catálogo
          </Button>
        </Box>
      </Modal>
    </Box>
  );
}
