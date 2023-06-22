import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Grid from '@mui/material/Grid';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import classes from './VistaAdmin.module.css';
import { useNavigate, useParams } from 'react-router-dom';



const AdministradorVista = () => {
  const {idUser} = useParams("idUser");
  const [contactos, setContactos] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    getContactos();
    
  }, []);

  const getContactos=() => {
    axios.post("http://localhost:5000/contacto/"+idUser).then(response=> {
      setContactos(response.data);
    })
  }

  const nuevaConsulta= (index)=> {
    navigate("/respuesta/"+contactos[index]._id);
  }

  return (
    <Grid container spacing={4} className={classes.cardGrid}>
      <Button
        variant="contained"
        sx={{height: "60px", mt: "100px", ml: "300px"}}
        onClick={() => {
          navigate("/Bienvenida/vistaUser")
        }}
      > 
        Terminar
      </Button>

      <Button
        variant="contained"
        sx={{height: "60px", mt: "100px", ml: "300px"}}
        onClick={() => {
          navigate("/Bienvenida/contacto/"+idUser);
        }}
      > 
        Nueva consulta
      </Button>

      <TableContainer component={Paper}>
      <Table sx={{ maxWidth: "1000px", maxHeight:"300px", ml: "400px"}} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="center">Remitente</TableCell>
            <TableCell align="center">Asunto</TableCell>
            <TableCell align="center">Cuerpo</TableCell>
            <TableCell align="center">Estado</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {contactos.map((row, index) => (
            <TableRow
              key={index}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell align="left">{row.email}</TableCell>
              <TableCell align="left">{row.asunto}</TableCell>
              <TableCell align="justify">{row.cuerpo}</TableCell>
              <TableCell align="left">{row.estado}</TableCell>

            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </Grid>
  ); 
};

export default AdministradorVista;