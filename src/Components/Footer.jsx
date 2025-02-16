
import { Box } from '@mui/material';

const Footer = () => {
  return (
    <Box
        component="footer"
        sx={{
            display: 'flex',
            justifyContent: 'center', 
            alignItems: 'center', 
            height: '50px', 
            backgroundColor: '#143D60', 
            color: 'white',
            fontSize: '0.875rem',
        }}
        >
        © 2024 Fake Fundación de Adopción - Propiedad intelectual de Jimena Espinoza - Cohorte 16 - Página creada con fines académicos
        </Box>
    );
};

export default Footer;
