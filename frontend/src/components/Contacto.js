import React from 'react';
import { Box, Typography, TextField, Button } from '@mui/material';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

export default function Contacto(){
    const {idUser} = useParams("idUser");
    let navigate = useNavigate();

    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        axios.post("http://localhost:5000/contacto", {
            idUser: idUser,
            email: data.get('correo'),
            asunto: data.get('asunto'),
            cuerpo: data.get('cuerpo'),
            estado: "abierta"
        }).then(response => {
            if(response.status===200){
                alert("Su consulta será atendida lo más pronto posible");
                navigate("/consultasUsuario/"+sessionStorage.getItem("idUser"))
            }else{
                alert("Ha habido un problema con su consulta inténtelo de nuevo más tarde");
            }
        })
    }

    return (

        <Box sx={{width: "60%", height: "60%", marginTop: "5%", marginLeft: "20%"}} component="form" onSubmit={handleSubmit}>

                <Typography> Indique su correo Electrónico</Typography>
                <TextField sx={{width: "100%", marginTop: "1%"}} required name="correo"></TextField>
                <Typography sx={{marginTop: "10px"}} required> Asunto:</Typography>
                <TextField sx={{width: "100%", marginTop: "1%"}} name="asunto"></TextField>
                <Typography 
                    sx={{marginTop: "10px"}} 
                    required 
                    
                > Qué nos quieres decir:</Typography>
                <TextField multiline sx={{width: "100%", height: "300px", marginTop: "1%"}} rows="11" name="cuerpo"> </TextField>


            <Button
                variant="contained"
                type="submit"
                sx={{marginTop: "10px"}}
            >
                Enviar
            </Button>

            <Button
                variant="contained"
                sx={{marginTop: "10px", marginLeft: "50px"}}
                onClick={() => {
                    navigate("/consultasUsuario/"+sessionStorage.getItem("idUser"))
                }}
            >
                Cancelar
            </Button>
        </Box>
    );
}