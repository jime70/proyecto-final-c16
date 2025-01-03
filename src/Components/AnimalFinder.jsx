import { Avatar, Button, Paper, TextField, Typography } from '@mui/material';
import React, { useEffect, useRef, useState } from 'react'

export const CandidateFinder = () => {

    const [data, setData] = useState(null);
    const [error, setError] = useState(null);

    const inputRef = useRef(null);

    useEffect(() => {
        if (inputRef.current) {
            inputRef.current.focus();
        }
    }, [] )

        const fetchUsers = async () => {
            const id = inputRef.current.value;
            try {
                const response = await fetch(`${import.meta.env.VITE_ANIMAL_API_URL}${id}`)
                console.log('response', response);
                if (!response.ok) {
                    throw new Error('Animal no encontrado');
                }
                const data = await response.json();
                console.log(data)
                setData(data);
                setError(null);

            } catch (error) {
                setError(error.message);
                setUser(null);
            }
        }

  return (
    
        <Paper 
        elevation={3}
        sx={{
            maxWidth: 400,
            margin: "auto",
            textAlign: "center",
            marginTop: 2
        }}
        >
            <Typography>Buscar candidato en adopción</Typography>
            <TextField 
                fullWidth 
                inputRef={inputRef}
                variant='outlined'
                placeholder='Ingrese el Id del animal'
                margin='normal'
            />
            <Button
                variant='contained'
                color='primary'
                onClick={fetchUsers}
                sx={{ marginTop: 2}}
            >
                Buscar
            </Button>
            {error && (
                <Typography variant='body1' color='error'>
                    {error}
                </Typography>
            )}
            {user && (
                <div>
                <Avatar
                    src={user.avatar_url}
                    sx={{                    
                    width: 10 * 2, 
                    height: 10 * 2,
                    margin: "0 auto",
                    marginTop: 2,
                    marginBottom: 2
                    }}
                />
                <Typography variant='body1' gutterBottom>Nombre: {data.name}</Typography>
                <Typography variant='body1' gutterBottom>Edad: {data.edad} Genero{data.genero}</Typography>
                <Typography variant='body1' gutterBottom>Estado:{data.estado}</Typography>
                </div>
            )}
        </Paper>
    
  );
};

export default CandidateFinder 