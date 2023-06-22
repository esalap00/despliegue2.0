import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Grid from '@mui/material/Grid';
import Box from  '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import classes from './VistaUser.module.css';
import { useNavigate } from 'react-router-dom';

const usuario = {
  _id: "",
  email: "",
};


const UsuarioVista = () => {
  const [carga, setCarga] =useState(true);
  const [peliculas, setPeliculas] = useState([]);

  let navigate = useNavigate();

  useEffect(() => {
    if(carga===true){
      const cargar = async() => {
        await getUsuario().then(()=> {
          if(usuario._id!==""){
            getPeliculas().then(() => {
            });
          }
      });
      setCarga(false);
    }

    const getUsuario = async () => {
      let email = sessionStorage.getItem("usuario");
      await axios.post("http://localhost:5000/usuario/usuario",  {
        email: email,
      })
      .then(usu =>{
        usuario._id = usu.data._id;
        usuario.email = usu.data.email;
        sessionStorage.setItem("idUser", usuario._id);
      })
    }

    var pelis = [];

    const getPeliculas= async () => {
      await axios.get("http://localhost:5000/peliculas")
      .then(async devolucion => {
        for(var i=0; i<devolucion.data.length; i++){
          var pelicula = {
            id: devolucion.data[i]._id,
            titulo: devolucion.data[i].titulo,
            sinopsis: devolucion.data[i].sinopsis,
            genero: devolucion.data[i].genero,
            valoracion: devolucion.data[i].valoracion,
            foto: devolucion.data[i].foto,
            pendiente: false,
            vista: false
          }

          await axios.post("http://localhost:5000/pendientes/" + usuario._id)
          .then(porVer => {
              for(var j=0; j<porVer.data.length; j++){
                if(porVer.data[j].idPelicula===pelicula.id){
                  pelicula.pendiente = true;
                }
              } 
          }); 

          await axios.post("http://localhost:5000/visualizaciones/" + usuario._id)
          .then(vista => {
              for(var j=0; j<vista.data.length; j++){
                if(vista.data[j].idPelicula===pelicula.id){
                  pelicula.vista = true;
                }
              } 
          });
    
          console.log(pelicula);
          pelis.push(pelicula);
        }
      });  
      setPeliculas(pelis);
      console.log(peliculas); 
    };
    cargar();
  };
  }, [peliculas, carga]);


  function guardarPendientes(index){
    axios.post("http://localhost:5000/pendientes", {
      idUser: usuario._id,
      titulo: peliculas[index].titulo
    }).then(response => {
      alert(peliculas[index].titulo + ", se ha añadido a su lista de pendientes de ver");
      var pelis = peliculas;
      pelis[index].pendiente = true;
      setPeliculas(pelis);
      console.log(peliculas);
      window.location.reload();
    })
  }

    function guardarVistas(index){
    axios.post("http://localhost:5000/visualizaciones", {
      idUser: usuario._id,
      titulo: peliculas[index].titulo
    }).then(response => {
      alert(peliculas[index].titulo + ", se ha añadido a su lista de vistas");
      var pelis = peliculas;
      pelis[index].vista = true;
      setPeliculas(pelis);
      console.log(peliculas);
      window.location.reload();
    })
  }

  function guardarFav(index){
    console.log(peliculas[index].id)
    axios.post("http://localhost:5000/favoritos", {
      idUser: usuario._id,
      titulo: peliculas[index].titulo
    }).then(response => {
      alert(peliculas[index].titulo + ", se ha añadido a su lista de favoritos");
      var pelis = peliculas;
      pelis[index].pendiente = true;
      setPeliculas(pelis);
      console.log(peliculas);
      window.location.reload();
    })
  }

  function valorar(index) {
    navigate("/Bienvenida/valoracion/"+sessionStorage.getItem("idUser")+"/"+peliculas[index].id);
  }
  

  function controlPelicula(index, pelicula){
      var controles = peliculas[index].vista;
      return (
          (controles) ? 
            <Box sx={{width: "100%", bottom: "1vh", position: "relative"}}>
              <Button variant="contained"
                color="primary"
                sx={{ml: "2%", width: "46%"}}
                onClick={() => guardarFav(index)}
              >
                Favoritos
              </Button>
              <Button 
                variant="contained" 
                color="secondary" 
                sx={{ml: "2%", width: "46%"}}
                onClick={() => {
                  valorar(index);
                }}
              >
                Valorar
              </Button>
            </Box>
          :   
            <Box sx={{width: "100%", bottom: "1vh", position: "relative"}}>
              <Button variant="contained"
                color="primary"
                sx={{ml: "2%", width: "46%", background: "#418161"}}
                disabled= {pelicula.pendiente}
                onClick={() => guardarPendientes(index)}
              >
                Ver en el futuro
              </Button>
              <Button 
                variant="contained" 
                color="secondary" 
                sx={{ml: "2%", width: "46%", background: "#009999"}}
                disabled={pelicula.vista} 
                onClick={() => guardarVistas(index)}
              >
                Vista
              </Button>
            </Box>
      );
  }

  return (
    <Box>
      <Button
        variant="contained"
        sx={{ml: "30px", mt:"30px"}}
        onClick={() => {
          navigate("/consultasUsuario/"+sessionStorage.getItem("idUser"))
        }}
      > 
        Contacta con nosotros 
      </Button>
      <Button
        variant="contained"
        sx={{ml: "30px", mt:"30px"}}
        onClick={() => {
          navigate("/Bienvenida/vistaUserFavoritos/"+sessionStorage.getItem("idUser"))
        }}
      > 
        Lista de Favoritos 
      </Button>
      <Button
        variant="contained"
        sx={{ml: "30px", mt:"30px"}}
        onClick={() => {
          navigate("/Bienvenida/vistaUserPendientes/"+sessionStorage.getItem("idUser"))
        }}
      > 
        Lista de pendientes 
      </Button>
      <Button
        variant="contained"
        sx={{ml: "30px", mt:"30px"}}
        onClick={() => {
          navigate("/Bienvenida/vistaUserVistas/"+sessionStorage.getItem("idUser"))
        }}
      > 
        Lista de visualizaciones
      </Button>
      <Grid container spacing={4} className={classes.cardGrid} sx={{ml: "5%", mt: "2%", width: "90%" }}>
        {peliculas.map((pelicula, index) => (
          <Grid item key={pelicula._id} xs={12} sm={6} md={4}>
            <Card className={classes.card}>
                <CardContent className={classes.cardContent}>
                  <Typography gutterBottom variant="h4" component="h2" align='center' sx={{ height: "80px"}}>
                    {pelicula.titulo}
                  </Typography>
                  <Box sx={{height: "50%"}}>
                    <img src={pelicula.foto} className={classes.fotoCartel} alt="Cartel"/>
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

                {controlPelicula(index, pelicula)}
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default UsuarioVista;