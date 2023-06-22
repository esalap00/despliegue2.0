import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Grid from '@mui/material/Grid';
import Box from  '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import classes from './VistaUser.module.css';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';

const UsuarioVista = () => {
  //const classes = useStyles();
  const [peliculas, setPeliculas] = useState([]);
  const [usuario, setUsuario] = useState([]);
  const navigate = useNavigate();

  const getUsuario= async() => {
    let email = sessionStorage.getItem("usuario");
    await axios.post("http://localhost:5000/usuario/usuario",  {
      email: email,
    })
    .then(usuario => {
      setUsuario(usuario.data);
      
    })
  } 

  useEffect(() => {
    //getUsuario();
    getPeliculasPendientes();
  }, []);

  const getPeliculasPendientes= async() => {
    await axios.post("http://localhost:5000/favoritos/"+sessionStorage.getItem("idUser"))
    .then(async devolucion => {
      console.log(devolucion.data);
      let pelis = [];
      for(let i=0; i<devolucion.data.length; i++){
        await axios.post("http://localhost:5000/peliculas/" + devolucion.data[i].idPelicula)
        .then(peli=> {
          pelis.push(peli.data[0]);
        })
      }
      setPeliculas(pelis);
    });
  }

  const abrirPeliculaEnNuevaPestanya = (pelicula) => {
    window.open(pelicula.url, '_blank');
  }

  return (
    <Box>
      <Button
        variant="contained"
        onClick={() => {
          navigate("/Bienvenida/vistaUser");
        }}
        sx={{ml: "30px", mt: "30px"}}
      >
        Regresar
      </Button>
      <Grid container spacing={4} className={classes.cardGrid} sx={{ml: "5%", mt: "2%", width: "90%" }}>
        {peliculas.map((pelicula) => (
          <Grid item key={pelicula._id} xs={12} sm={6} md={4}>
            <Card className={classes.card} sx={{ height: "500px"}}>
                <CardContent className={classes.cardContent}>
                  <Typography gutterBottom variant="h4" component="h2" align='center' sx={{ height: "80px"}}>
                    {pelicula.titulo}
                  </Typography>
                  <Box sx={{height: "60%"}}>
                    <img src={pelicula.foto} className={classes.fotoCartel}/>
                  </Box>
                  <Typography>
                    sinopsis: {pelicula.sinopsis}
                  </Typography>
                  <Typography>
                    Género: {pelicula.genero}
                  </Typography>
                  <Typography>
                    Valoración: {pelicula.valoracion}
                  </Typography>
                  
                </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default UsuarioVista;