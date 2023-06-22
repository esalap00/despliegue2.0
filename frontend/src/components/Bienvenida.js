import React from 'react';
import { useState } from 'react';
import { createTheme, styled, ThemeProvider } from '@mui/material/styles';
import {
  AppBar, Box, Toolbar, Typography, Button, DialogContent, DialogContentText, DialogTitle,
  Dialog, DialogActions, Grid
} from '@mui/material';
import { useNavigate } from "react-router-dom";
import Footer from "./Footer";
import { cambiarTituloSiUsuarioSeVa } from '../extras/cambiarTitulo';
import Image from "../images/awflix.png";

cambiarTituloSiUsuarioSeVa();

const theme = createTheme({
  typography: {
    button: {
      fontWeight: 'bold',

    },
  },
});

function Bienvenida() { 
  const [open, setOpen] = useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  }
  const handleClose = () => {
    setOpen(false);
  }

  let navigate = useNavigate();

  return (
    //Así estará en toda la pantalla
    <Grid container direction="column" justifyContent="space-between" sx={{ minHeight: '100vh' }}>
      <Grid item>
        <AppBar position="static" sx={{ backgroundColor: "black" }}>
          <Toolbar disableGutters>
            <img
              src={Image}
              alt="Logo de AWFLIX"
              style={{ display: 'block', margin: 'auto', maxWidth: '9%', maxHeight: '9%', marginRight: 'auto', marginLeft: 'calc(50% - 50px)' }}
            />
            <Button onClick={handleClickOpen} sx={{ color: "red" }}>Normas de la Empresa</Button>
            <Dialog open={open} onClose={handleClose}>
              <DialogTitle>
                Políticas de privacidad

              </DialogTitle>
              <DialogContent>
                <DialogContentText>
                  1. Según la ley orgánica del 15/1999 queda totalmente prohibido compartir datos personales de los usuarios.
                </DialogContentText>
                <DialogContentText>
                  2. Según la ley orgánica del 5/1992 todo usuario podrá cambiar sus datos si es solicitado.
                </DialogContentText>
                <DialogContentText>
                  3. Según la ley orgánica del 3/2018 los usuarios solo podrán ver sus propios datos.
                </DialogContentText>
              </DialogContent>
            </Dialog>
          </Toolbar>
        </AppBar>
        <Grid container justifyContent="center" sx={{ py: 5 }}>
          <Grid item xs={12} sm={8} md={6} lg={4}>
            <Box sx={{ textAlign: 'center' }}>
              <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 2 }}>
                Bienvenidos a nuestra plataforma de gestión de series y películas.
              </Typography>
              <Typography variant="h6" sx={{ mb: 2 }}>
                ¿Eres un amante del cine y las series? ¿Tienes una larga lista de títulos pendientes por ver?
              </Typography>
              <Typography variant="h6" sx={{ mb: 2 }}>
                ¡Estás en el lugar indicado! Aquí podrás seleccionar y añadir todas tus series y películas favoritas.
              </Typography>
              <Button variant="contained" color="primary" onClick={() => navigate("./login")} sx={{ boxShadow: '0px 3px 5px rgba(0,0,0,0.3)', mr: 2 }}>Iniciar Sesión</Button>
              <Button variant="contained" color="secondary" onClick={() => navigate("./userSignUp")} sx={{ boxShadow: '0px 3px 5px rgba(0,0,0,0.3)' }}>Registrarse</Button>
            </Box>
          </Grid>
        </Grid>
      </Grid>
      <Grid item>
        <Footer />
      </Grid>
    </Grid>
  );
}

export default Bienvenida;