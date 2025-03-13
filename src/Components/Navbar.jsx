import * as React from "react";
import { useState, useContext } from "react";
import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Typography,
  Menu,
  MenuItem,
  Button,
  Container,
  Badge,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import AccountCircle from "@mui/icons-material/AccountCircle";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { Link, useNavigate } from "react-router-dom";
import ClientContext from "../contexts/clients/ClientContext";
import StoreContext from "../contexts/store/StoreContext";
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
  const navigate = useNavigate();
  const { authStatus, logout } = useContext(ClientContext);
  const { cart } = useContext(StoreContext);

  const handleOpenNavMenu = (event) => setAnchorElNav(event.currentTarget);
  const handleOpenUserMenu = (event) => setAnchorElUser(event.currentTarget);
  const handleCloseNavMenu = () => setAnchorElNav(null);
  const handleCloseUserMenu = () => setAnchorElUser(null);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <AppBar position="fixed" sx={{ backgroundColor: "#145b86" }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          {/* Logo en la versión de escritorio */}
          <Box
            component={Link}
            to="/"
            sx={{
              display: { xs: "none", md: "flex" },
              alignItems: "center",
              textDecoration: "none",
              mr: 2,
            }}
          >
            <img
              src={logo}
              alt="Logo"
              style={{ height: "40px", width: "auto", borderRadius: "50%" }}
            />
          </Box>

          {/* Menú hamburguesa para dispositivos pequeños */}
          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton size="large" onClick={handleOpenNavMenu} color="inherit">
              <MenuIcon />
            </IconButton>
            <Menu anchorEl={anchorElNav} open={Boolean(anchorElNav)} onClose={handleCloseNavMenu}>
              {pages.map((page) => (
                <MenuItem key={page.name} onClick={handleCloseNavMenu} component={Link} to={page.path}>
                  {page.name}
                </MenuItem>
              ))}
            </Menu>
          </Box>

          {/* Nombre del sitio en móvil */}
          <Typography
            variant="h5"
            noWrap
            component={Link}
            to="/"
            sx={{
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              textDecoration: "none",
              color: "inherit",
            }}
          >
            RESCATE ANIMAL
          </Typography>

          {/* Menú de navegación en escritorio */}
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {pages.map((page) => (
              <Button key={page.name} component={Link} to={page.path} sx={{ my: 2, color: "white", display: "block" }}>
                {page.name}
              </Button>
            ))}
          </Box>

          {/* Ícono del carrito visible solo si está autenticado */}
          {authStatus && (
            <IconButton component={Link} to="/checkout" color="inherit">
              <Badge badgeContent={cart.length} color="secondary">
                <ShoppingCartIcon />
              </Badge>
            </IconButton>
          )}

          {/* Menú del usuario con opciones de login/logout y perfil */}
          <Box sx={{ flexGrow: 0 }}>
            <IconButton onClick={handleOpenUserMenu} color="inherit">
              <AccountCircle />
            </IconButton>
            <Menu anchorEl={anchorElUser} open={Boolean(anchorElUser)} onClose={handleCloseUserMenu}>
              {!authStatus ? (
                <>
                  <MenuItem component={Link} to="/register" onClick={handleCloseUserMenu}>
                    Registrarse
                  </MenuItem>
                  <MenuItem component={Link} to="/login" onClick={handleCloseUserMenu}>
                    Iniciar Sesión
                  </MenuItem>
                </>
              ) : (
                <>
                  <MenuItem component={Link} to="/profile" onClick={handleCloseUserMenu}>
                    Profile
                  </MenuItem>
                  <MenuItem onClick={handleLogout}>Cerrar Sesión</MenuItem>
                </>
              )}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default Navbar;
