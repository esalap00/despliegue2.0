import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import classes from './VistaAdmin.module.css';
import { useNavigate } from 'react-router-dom';



const AdministradorVista = () => {
  const [titulo, setTitulo] = useState('');
  const [portada, setPortada] = useState('');
  const [anio, setAnio] = useState('');
  const [peliculas, setPeliculas] = useState([]);
  const [genero, setGenero] = useState('');
  const headers = ["Titulo", "sinopsis", "genero", "valoracion"];
  const navigate = useNavigate();

  useEffect(() => {
    getFilms();
    
  }, []);

  const getFilms=() => {
    axios.get("http://localhost:5000/peliculas/").then(response=> {
      setPeliculas(response.data);
    })
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    const pelicula = {
      titulo: data.get("titulo"),
      foto: data.get("portada"),
      sinopsis: data.get("sinopsis"),
      genero: data.get("genero"),
      valoracion: 0 //es una película nueva, no puede tener valoraciones
    };
      document.getElementById("titulo").value="";
      document.getElementById("portada").value="";
      document.getElementById("sinopsis").value="";
      document.getElementById("genero").value="";
    axios.post('http://localhost:5000/peliculas', pelicula)
      .then(response => {
        console.log(response);
        getFilms();
      })
      .catch(error => {
        console.log(error);
      });
  };

  const borrar= (index)=> {
    axios.delete("http://localhost:5000/peliculas/"+peliculas[index]._id)
    .then(response=> {
      alert(response.data);
      getFilms();
    });
  }

  return (
    <Grid container spacing={4} className={classes.cardGrid}>
      <Grid item sx={12} sm={6} md={4} spacing={4}>
        <Card className={classes.card}>

          <CardContent className={classes.cardContent}>
            <Typography
              gutterBottom 
              variant="h4" 
              component="h2" 
              align='center'
            >
              Añadir película/serie
            </Typography>
            <Box component="form" onSubmit={handleSubmit}>
              <TextField
                required
                id="titulo"
                label="Título"
                name="titulo"
                onChange={(event) => setTitulo(event.target.value)}
                sx={{mx: "12px", mt: "12px", mb: "6px"}}
              />
              <TextField
                required
                id="portada"
                name="portada"
                label="URL Cartel"
                value={portada}
                onChange={(event) => setPortada(event.target.value)}
                sx={{mx: "12px", mt: "12px", mb: "6px"}}
              />
              <TextField
                required
                id="sinopsis"
                name="sinopsis"
                label="Sinopsis"
                value={anio}
                onChange={(event) => setAnio(event.target.value)}
                sx={{mx: "12px", mt: "12px", mb: "6px"}}
              />
              <TextField
                required
                id="genero"
                label="Género"
                name="genero"
                value={genero}
                sx={{mx: "12px", mt: "12px", mb: "6px"}}
                onChange={(event) => setGenero(event.target.value)}
              />
              <Button 
                type="submit" 
                variant="contained" 
                color="primary" 
                sx={{width: "424px", height: "55px", mx: "12px", mt: "12px", mb: "6px"}}
              >
                Añadir 
              </Button> 
            </Box> 
          </CardContent> 
        </Card> 
      </Grid> 

      <Button
        variant="contained"
        sx={{height: "60px", mt: "100px", ml: "300px"}}
        onClick={() => {
          navigate("/consultasAdmin")
        }}
      > 
        Revisar consultas
      </Button>

      <TableContainer component={Paper}>
      <Table sx={{ maxWidth: "1000px", maxHeight:"300px", ml: "400px"}} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="center"></TableCell>
            <TableCell align="center">Titulo</TableCell>
            <TableCell align="center">Genero</TableCell>
            <TableCell align="center">Sinopsis</TableCell>
            <TableCell align="center">Valoracion</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {peliculas.map((row, index) => (
            <TableRow
              key={index}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <Button 
                sx={{mt: "6px"}} 
                variant="outlined"
                onClick={() =>{
                  borrar(index);
                }}
              >
                Eliminar
              </Button>
              <TableCell align="left">{row.titulo}</TableCell>
              <TableCell align="left">{row.genero}</TableCell>
              <TableCell align="justify">{row.sinopsis}</TableCell>
              <TableCell align="left">{row.valoracion}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </Grid>
  ); 
};

export default AdministradorVista;