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
  const [contactos, setContactos] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    getContactos();
    
  }, []);

  const getContactos=() => {
    axios.get("http://localhost:5000/contacto/").then(response=> {
      setContactos(response.data);
    })
  }

  const respuesta= (index)=> {
    navigate("/respuesta/"+contactos[index]._id);
  }

  const cerrarConsulta= (index)=> {
    if(window.confirm("Desea cerrar la consulta con asunto: " + contactos[index].asunto)){
      axios.put("http://localhost:5000/contacto/"+contactos[index]._id)
      .then(resp=> {
        setContactos(resp.data);
      })
    }
  }

  function posibleRespuesta(index) {
    if(contactos[index].estado==="abierta"){
      return (
        <TableCell align="left">
          <Button align="left" variant="contained" onClick={()=> { respuesta(index) }}>Responder</Button>
        </TableCell>
      );
    }else{
      return (
        <TableCell align="left">
          <Button align="left" variant="contained" disabled>Responder</Button>
        </TableCell>
      );
    }
  }

  function posibleCierre(index) {
    if(contactos[index].estado==="abierta"){
      return (
          <TableCell align="left">
            <Button align="left" variant="contained" onClick={()=> { cerrarConsulta(index) }}>Cerrar consulta</Button>
          </TableCell>
      );
    }else{
      return (
        <TableCell align="left">
          <Button align="left" variant="contained" disabled>Cerrar consulta</Button>
        </TableCell>
      );
    }
  }

  return (
    <Grid container spacing={4} className={classes.cardGrid}>
      <Button
        variant="contained"
        sx={{height: "60px", mt: "100px", ml: "300px"}}
        onClick={() => {
          navigate("/Bienvenida/vistaAdmin")
        }}
      > 
        Terminar
      </Button>

      <TableContainer component={Paper}>
      <Table sx={{ maxWidth: "1000px", maxHeight:"300px", ml: "400px"}} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="center">Responder</TableCell>
            <TableCell align="center">Remitente</TableCell>
            <TableCell align="center">Asunto</TableCell>
            <TableCell align="center">Cuerpo</TableCell>
            <TableCell align="center">Estado</TableCell>
            
            <TableCell align="center">Cerrar consulta</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {contactos.map((row, index) => (
            <TableRow
              key={index}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              {posibleRespuesta(index)}
              <TableCell align="left">{row.email}</TableCell>
              <TableCell align="left">{row.asunto}</TableCell>
              <TableCell align="justify">{row.cuerpo}</TableCell>
              <TableCell align="left">{row.estado}</TableCell>
              {posibleCierre(index)}

            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </Grid>
  ); 
};

export default AdministradorVista;