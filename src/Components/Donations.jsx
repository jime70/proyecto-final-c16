import * as React from "react";
import Box from "@mui/material/Box";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import { motion } from "framer-motion";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";

const theme = createTheme({
  palette: {
    primary: {
      main: "#D0DDD0",
      dark: "#B6CBBD",
    },
  },
  typography: {
    fontFamily: "'Bebas Neue', sans-serif",
  },
});

const Donations = () => {
  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          width: "90%",
          height: 200,
          border: "1px solid #578E7E",
          borderRadius: "20px",
          bgcolor: "primary.main",
          "&:hover": {
            bgcolor: "primary.dark",
          },
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: 2,
          margin: "0 auto",
        }}
      >
        <motion.div
          animate={{
            y: [0, -10, 0],
          }}
          transition={{
            duration: 0.6,
            repeat: 2,
            repeatType: "reverse",
            ease: "easeInOut",
          }}
        >
          <Typography
            variant="h3"
            color="#3D3D3D"
            align="center"
            gutterBottom
            fontSize="50px"
          >
            Dona alimento para una mascota rescatada
          </Typography>
          <Typography
            variant="body1"
            color="#3D3D3D"
            align="center"
            fontFamily="sans-serif"
            fontSize="28px"
          >
            Ayúdanos a llevar alimento a las mascotas de la fundación. Dona un
            pack de alimentos, ayúdanos a tener mascotas felices.
          </Typography>
          <Button
            variant="contained"
            component={Link}
            to="/store"
            sx={{
              mt: 2,
              width: "25%",
              borderRadius: 15,
              display: "block",
              textAlign: "center",
              backgroundColor: "#89A8B2",
              color: "black",
              "&:hover": { backgroundColor: "#578E7E", color: "white" },
              margin: "0 auto",
              fontFamily: "sans-serif",
            }}
          >
            Pulsa para donar
          </Button>
        </motion.div>
      </Box>
    </ThemeProvider>
  );
};

export default Donations;
