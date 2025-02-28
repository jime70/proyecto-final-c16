import { useState } from "react";
import { TextField, Button, Box, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
    street1: "",
    street2: "",
    region: "",
    city: "",
    zip: "",
    phone1: "",
    phone2: "",
  });

  const [message, setMessage] = useState(""); 
  const [error, setError] = useState("");
  const navigate = useNavigate(); 

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:3003/api/clients/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (response.ok) {
        setMessage("✅ Registro exitoso, ahora puedes iniciar sesión.");
        setFormData({
          name: "",
          username: "",
          email: "",
          password: "",
          street1: "",
          street2: "",
          region: "",
          city: "",
          zip: "",
          phone1: "",
          phone2: "",
        });
      } else {
        setMessage("❌ Error: " + data.msg);
      }
    } catch (error) {
      setMessage("❌ Error de conexión con el servidor.");
    }
  };

  return (
    <Box sx={{ maxWidth: 500, margin: "auto", padding: 3, backgroundColor: "#f8eeff", borderRadius: "10px" }}>
      <Typography variant="h4" align="center" gutterBottom>
        Registro de Cliente
      </Typography>
      
      <form onSubmit={handleSubmit}>
        <TextField fullWidth label="Nombre" name="name" value={formData.name} onChange={handleChange} required />
        <TextField fullWidth label="Usuario" name="username" value={formData.username} onChange={handleChange} required />
        <TextField fullWidth label="Correo Electrónico" name="email" value={formData.email} onChange={handleChange} required />
        <TextField fullWidth label="Contraseña" type="password" name="password" value={formData.password} onChange={handleChange} required />
        
        <Typography variant="h6" mt={2}>Dirección</Typography>
        <TextField fullWidth label="Calle 1" name="street1" value={formData.street1} onChange={handleChange} />
        <TextField fullWidth label="Calle 2" name="street2" value={formData.street2} onChange={handleChange} />
        <TextField fullWidth label="Región" name="state" value={formData.state} onChange={handleChange} />
        <TextField fullWidth label="Ciudad" name="city" value={formData.city} onChange={handleChange} />
        <TextField fullWidth label="Código Postal" name="zip" value={formData.zip} onChange={handleChange} />

        <Typography variant="h6" mt={2}>Teléfono</Typography>
        <TextField fullWidth label="Teléfono 1" name="phone1" value={formData.phone1} onChange={handleChange} />
        <TextField fullWidth label="Teléfono 2" name="phone2" value={formData.phone2} onChange={handleChange} />

        {message && <Typography color="error" mt={2}>{message}</Typography>}

        <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
          Registrarse
        </Button>
      </form>
    </Box>
  );
};

export default Register;
