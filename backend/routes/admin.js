const express = require("express");
const router = express.Router();
const Contenido = require("../models/peliculas").peliculas;
const Valoracion = require("../models/valoracion").valoracion;
const {ObjectId} = require('mongodb');

//Función devuelve todas las péliculas y series de la superbase de datos Anuel
router.get("/", async function(req, res){
    try{
        const contenidoresp = await Contenido.find();
        res.json(contenidoresp);
    }catch(e){
        console.log("Error en la peticion get ", e);
        res.status(400).send("Error en el servidor");
    }
})

router.get("/valoracionMedia", async function(req, res){
    const {idPelicula}= req.body;
    const peliculaId = new ObjectId(idPelicula);
    //Aqui busco todos los datos de una misma pelicula
    const total = await Valoracion.find({idPelicula: peliculaId});

    let count = 0;
    let suma = 0;
    total.forEach(element => {
        suma = suma + element.valoracion;
        count++;
    });

    let media = suma/count;

    if(media < 0){
        res.sendStatus(500);
    }

    res.send({media:media})
})

router.post("/", async function(req, res){
    const {titulo, genero, sinopsis, valoracion, foto} = req.body

    try{
        const contenido = await Contenido.findOne({titulo:titulo, genero:genero, sinopsis:sinopsis, valoracion:valoracion, foto:foto})
        if(!contenido){
            const nuevoContenido = new Contenido(contenido);
            await nuevoContenido.save();
            res.sendStatus(200);
        }else{
            res.sendStatus(400);
        }
    }catch(e){
        console.log("Error: ",e);
    }
})

router.put("/", async function(req, res){
    const {titulo, genero, sinopsis, valoracion, foto} = req.body

    try{
        const contenido = await Contenido.finOne({titulo:titulo, genero:genero, sinopsis:sinopsis, valoracion:valoracion, foto:foto})
        if(!contenido){
            res.status(404).send("Error contenido no encontrado")
        }else{
            contenido.titulo = titulo || contenido.titulo;
            contenido.genero = genero || contenido.genero;
            contenido.sinopsis = sinopsis || contenido.sinopsis;
            contenido.valoracion = valoracion || contenido.valoracion;
            contenido.foto = foto || contenido.foto;

            const updatedContenido = await contenido.save();
            res.sendStatus(200);
        }
    }catch(e){
        console.log("Error ", e)
        res.status(500).send("Error al cambiar algún dato del usuario")
    }

})

router.delete("/", async function(req, res){
    const {titulo, genero, sinopsis, valoracion, foto} = req.body

    try{
        const contenido = await Contenido.findOneAndDelete({titulo:titulo, genero:genero, sinopsis:sinopsis, valoracion:valoracion, foto:foto})
        if(!contenido){
            res.sendStatus(404);
        }else{
            res.sendStatus(200);
        }
    }catch(e){
        res.status(500).send("Error al eliminar el contenido")
    }

})

module.exports = router;