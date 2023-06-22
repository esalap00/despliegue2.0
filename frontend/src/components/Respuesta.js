import React from 'react';
import { Box, Typography, TextField, Button } from '@mui/material';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

let cons = {
    _id: "",
    email: "",
    asunto: "",
    cuerpo: "",
    estado: ""
}

export default function Contacto(){
    const {idUser} = useParams("idUser");
    const {idConsulta} = useParams("idConsulta");
    let navigate = useNavigate();
    const [consulta, setConsulta] = useState([cons]);
    const [carga, setCarga] = useState(true);

    useEffect(() => {
        if(carga===true){
            setCarga(false);
            const cargar = async () => {
                await axios.post("http://localhost:5000/contacto/consulta/"+idConsulta)
                .then(response=> {
                    console.log(response.data);
                    setConsulta(response.data);
                });
            }
            cargar();
        }
    }, [consulta, idConsulta]);

    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        axios.post("http://localhost:5000/contacto", {
            idUser: consulta[0].idUser,
            email: sessionStorage.get("usuario"),
            asunto: consulta[0].asunto,
            cuerpo: data.get('cuerpo'),
            estado: "respuesta"
        }).then(response => {
            if(response.status===200){
                alert("Su consulta será atendida lo más pronto posible");
                navigate("/consultasAdmin");
            }else{
                alert("Ha habido un problema con la respuesta");
            }
        })
    }

    return (

        <Box sx={{width: "60%", height: "60%", marginTop: "5%", marginLeft: "20%"}} component="form" onSubmit={handleSubmit}>
            <Typography sx={{fontWeight: "bold", mt: "10px"}}> Email:</Typography>
            <Typography> {consulta[0].email}</Typography>
            <Typography sx={{fontWeight: "bold", mt: "10px"}}> Asunto:</Typography>
            <Typography> {consulta[0].asunto}</Typography>
            <Typography sx={{fontWeight: "bold", mt: "10px"}}> Mensaje:</Typography>
            <Typography> {consulta[0].cuerpo}</Typography>
            <Typography 
                sx={{fontWeight: "bold", mt: "10px"}}
            > 
                Respuesta:
            </Typography>
            <TextField multiline sx={{width: "100%", height: "300px", marginTop: "1%"}} rows="11" name="cuerpo"> </TextField>


            <Button
                variant="contained"
                type="submit"
                sx={{marginTop: "10px"}}
            >
                Enviar
            </Button>
        </Box>
    );
}