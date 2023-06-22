import React from 'react';
import {Box, Typography, Button} from '@mui/material';
import { useParams } from 'react-router-dom';
import {useEffect, useState} from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

var peli ={
    _id: "",
    titulo: "titulo",
    sinopsis: "sinopsis",
    foto: "foto",
    valoracion: "0",
    genero: "uno",
}


export default function Valoracion() {

    const {idUser} = useParams("idUser");
    const {idPelicula} = useParams("idPelicula");
    const [pelicula, setPelicula] = useState(peli);
    const [carga, setCarga] =useState(true);

    const navigate = useNavigate();

    useEffect(() => {

        const cargaPelicula=async ()=>{
            await axios.post("http://localhost:5000/peliculas/"+idPelicula).then(response => {
                console.log(response.data);
                setPelicula(response.data[0]);
            })
        }
        if(carga){
            setCarga(false);
            cargaPelicula();
        }
    }, [pelicula, carga, idPelicula])



    const puntuacion =(puntos) => {
        axios.post("http://localhost:5000/valoracion", {
        idUser: idUser,
        idPelicula: idPelicula,
        valoracion: puntos
        }).then(() => {
            alert("Ha dado " + puntos + " a la película " + pelicula.titulo);
            navigate(-1);
        })
    }

    return (
        <Box
            sx={{backgroundColor:"black", width: "98%", height:"615px", marginTop: "10px", marginLeft: "1%", paddingTop: "100px"}}
        >
            {<Box sx={{textAlign: "center"}}>
                <Typography  variant="h6" component="h2" sx={{color:"white"}}>
                Puntuación que le da a "{pelicula.titulo}"
                </Typography>
                <Box sx={{display: "flex", width: "75%", mx:"12.5%", mt:"150px"}}>
                    <Button variant="contained" sx={{mx:"20px"}} onClick={()=>{puntuacion(0)}}>0</Button>
                    <Button variant="contained" sx={{mx:"20px"}} onClick={()=>{puntuacion(1)}}>1</Button>
                    <Button variant="contained" sx={{mx:"20px"}} onClick={()=>{puntuacion(2)}}>2</Button>
                    <Button variant="contained" sx={{mx:"20px"}} onClick={()=>{puntuacion(3)}}>3</Button>
                    <Button variant="contained" sx={{mx:"20px"}} onClick={()=>{puntuacion(4)}}>4</Button>
                    <Button variant="contained" sx={{mx:"20px"}} onClick={()=>{puntuacion(5)}}>5</Button>
                    <Button variant="contained" sx={{mx:"20px"}} onClick={()=>{puntuacion(6)}}>6</Button>
                    <Button variant="contained" sx={{mx:"20px"}} onClick={()=>{puntuacion(7)}}>7</Button>
                    <Button variant="contained" sx={{mx:"20px"}} onClick={()=>{puntuacion(8)}}>8</Button>
                    <Button variant="contained" sx={{mx:"20px"}} onClick={()=>{puntuacion(9)}}>9</Button>
                    <Button variant="contained" sx={{mx:"20px"}} onClick={()=>{puntuacion(10)}}>10</Button>
                </Box>
            </Box>}
        </Box>
    )
}