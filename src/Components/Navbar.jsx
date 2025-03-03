import * as React from "react";
import { useState, useEffect } from "react";
import { AppBar, Box, Toolbar, IconButton, Typography, Menu, MenuItem, Button, Container } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import AccountCircle from "@mui/icons-material/AccountCircle"; 
import { Link, useNavigate } from "react-router-dom";
import logo from "../Images/logo.jpeg";

const pages = [
  { name: "INICIO", path: "/" },
  { name: "ADOPCIONES", path: "/catalog" },
  { name: "FORMULARIO", path: "/formulario" },
  { name: "TIENDA", path: "/store" },
  { name: "SERVICIOS", path: "/services" },
  { name: "SOBRE NOSOTROS", path: "/information" },
];

function Navbar() {
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false); 
  const navigate = useNavigate(); 

  // 🔹 Detectar si hay un token en localStorage y actualizar el estado
  useEffect(() => {
    const checkAuth = () => {
      const token = localStorage.getItem("token");
      setIsAuthenticated(!!token);
    };

    checkAuth(); 
    window.addEventListener("storage", checkAuth); // 🔹 Detecta cambios en localStorage

    return () => window.removeEventListener("storage", checkAuth);
  }, []);

  const handleOpenNavMenu = (event) => setAnchorElNav(event.currentTarget);
  const handleOpenUserMenu = (event) => setAnchorElUser(event.currentTarget);
  const handleCloseNavMenu = () => setAnchorElNav(null);
  const handleCloseUserMenu = () => setAnchorElUser(null);

  // 🔹 Función de Logout
  const handleLogout = () => {
    localStorage.removeItem("token"); 
    setIsAuthenticated(false); 
    navigate("/"); 
  };

  return (
    <AppBar position="fixed" sx={{ backgroundColor: "#145b86" }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          {/* Logo */}
          <Box component={Link} to="/" sx={{ display: { xs: "none", md: "flex" }, alignItems: "center", textDecoration: "none", mr: 2 }}>
            <img src={logo} alt="Logo" style={{ height: "40px", width: "auto", borderRadius: "50%" }} />
          </Box>

          {/* Menú Responsive (Móvil) */}
          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton size="large" onClick={handleOpenNavMenu} color="inherit">
              <MenuIcon />
            </IconButton>
            <Menu
              anchorEl={anchorElNav}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
            >
              {pages.map((page) => (
                <MenuItem key={page.name} onClick={handleCloseNavMenu} component={Link} to={page.path}>
                  {page.name}
                </MenuItem>
              ))}
            </Menu>
          </Box>

          {/* Título en móviles */}
          <Typography
            variant="h5"
            noWrap
            component={Link}
            to={"/"}
            sx={{ display: { xs: "flex", md: "none" }, flexGrow: 1, fontFamily: "monospace", fontWeight: 700, letterSpacing: ".3rem", textDecoration: "none", color: "inherit" }}
          >
            RESCATE ANIMAL
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {pages.map((page) => (
              <Button key={page.name} component={Link} to={page.path} sx={{ my: 2, color: "white", display: "block" }}>
                {page.name}
              </Button>
            ))}
          </Box>

          {/* Menú de Usuario (Login / Logout) */}
          <Box sx={{ flexGrow: 0 }}>
            <IconButton onClick={handleOpenUserMenu} color="inherit">
              <AccountCircle />
            </IconButton>
            <Menu
              anchorEl={anchorElUser}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {!isAuthenticated ? (
                <>
                  <MenuItem component={Link} to="/register" onClick={handleCloseUserMenu}>
                    Registrarse
                  </MenuItem>
                  <MenuItem component={Link} to="/login" onClick={handleCloseUserMenu}>
                    Iniciar Sesión
                  </MenuItem>
                </>
              ) : (
                <MenuItem onClick={handleLogout}>Cerrar Sesión</MenuItem>
              )}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default Navbar;
