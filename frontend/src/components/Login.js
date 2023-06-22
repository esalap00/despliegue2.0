import React, { useState } from 'react';
import {Button,CssBaseline,TextField,Link,Paper,Box,Grid,Typography,createTheme,ThemeProvider,
  styled,DialogContentText,DialogTitle,Dialog,
} from '@mui/material';
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Footer from "./Footer";
import GoogleButton from 'react-google-button';
import Image from "../images/awflix.png";
import sideBanner from "../images/sideBanner.png";


const Img = styled("img")({
  margin: "auto",
  display: "block",
  maxWidth: "15%",
  maxHeight: "15%",
});

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://www.unileon.es/">
        AWFLIX
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const theme = createTheme();

export default function SignInSide() {
   
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  }

  const handleClose = () => {
    setOpen(false);
  }

  let navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    /*console.log({
      email: data.get('usuario'),
      contrasena: data.get('contrasena'),
    });*/
    let email = data.get('usuario');
    let contrasena = data.get('contrasena');

    if( data.get('usuario') === "" || data.get('contrasena') === ""){
      window.confirm("No puede estar el campo usuario o contraseña vacios");
      
    }

    //Hay que hacer la solicitud al backend       
    axios.post("http://localhost:5000/usuario/verify/", {
      "email": email, 
      "contrasena": contrasena
    }).then(function(response){
      console.log(response.data)
      if(response.data==="")   alert("Error en los datos de acceso, compruebe usuario y contraseña ☹");
      else{
        
        sessionStorage.setItem("usuario", email);
        if(response.data.rol==="rolUsuario"){
            navigate("/Bienvenida/vistaUser");
        }else{
          navigate("/Bienvenida/vistaAdmin");
        }
      }
    });    
  };

  return (
    <ThemeProvider theme={theme}>
      <Grid container component="main" sx={{ height: '100vh' }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: `url(${sideBanner})`,
            backgroundRepeat: 'no-repeat',
            backgroundColor: (t) =>
              t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            
            <img
              src={Image}
              alt="Logo de AWFLIX"
              style={{ display: 'block', margin: 'auto', maxWidth: '30%', maxHeight: '30%', marginRight: 'auto', marginLeft: 'calc(55% - 90px)' }}
            />
            <Typography component="h1" variant="h5">
              Bienvenido a AWFlix

            </Typography>
            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="usuario"
                label="Correo Electrónico"
                name="usuario"
                autoComplete="usuario"
                variant="standard"
                autoFocus
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="contrasena"
                label="Contraseña"
                type="password"
                id="contrasena"
                autoComplete="current-password"
                variant="standard"
              />

              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2, backgroundColor: "lightblue" }}
              >
                ENTRAR
              </Button>
              <Grid container>
                <Grid item xs>
                  <Dialog open={open} onClose={handleClose}>
                    <DialogTitle>
                      Contacta con nosotros
                    </DialogTitle>
                    <DialogContentText>
                      contacto@introapp.es
                    </DialogContentText>
                  </Dialog>
                </Grid>
              </Grid>
              <GoogleButton/>
              <Link href="#" variant="body2" onClick={handleClickOpen}>
                    Contacta con nosotros
              </Link>
              <Copyright sx={{ mt: 5 }} />
            </Box>
          </Box>
        </Grid>
      </Grid>
      <Footer/>
    </ThemeProvider>
  );
}