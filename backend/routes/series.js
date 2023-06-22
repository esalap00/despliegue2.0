const express = require("express");
const router = express.Router();
const Series = require("../models/series").series;

router.get("/", async function(req, res){
    try{
        const seriesresp = await Series.find();
        res.json(seriesresp);
    }catch(e){
        console.log("Error en la peticion get", e);
        res.status(400).send("Error en el servidor");
    }
})

router.post("/", async function(req, res){
    const {foto:foto, titulo, genero, sinopsis, valoracion, director} = req.body

    try{
        const serie = {};

        serie.foto = foto;
        serie.titulo = titulo;
        serie.genero = genero;
        serie.sinopsis = sinopsis;
        serie.valoracion = valoracion;
        serie.director = director;

        const serieAniadida = new Series(serie);
        await serieAniadida.save();

        return res.send("Serie añadida correctamente")

    }catch(e){
        console.log("Error al añadir una serie", e);
        return  res.status(400).send("Error al añadir una serie");
    }

})

router.put("/", async function(req, res){
    const titulo = req.body.titulo
    const {foto:foto, genero, sinopsis, valoracion, director} = req.body

    try{
        const serie = await Series.findOne({titulo:titulo});

        if(!serie){
            return res.status(404).send("Error la serie no encontrado")
        }else{
            serie.foto = foto || serie.foto
            serie.genero = genero || serie.genero
            serie.sinopsis = sinopsis || serie.sinopsis
            serie.valoracion = valoracion || serie.valoracion
            serie.director = director || serie.director

            const updateSerie = await serie.save();
            return res.json(updateSerie);
        }

    }catch(e){
        console.log("Error ", e)
        return res.status(500).send("Error al cambiar algún dato de una serie")
    }

})

router.delete("/", async function(req, res){
    const {foto:foto, titulo, genero, sinopsis, valoracion, director} = req.body

    try{
        const serie = await Series.findOneAndDelete({foto:foto, titulo:titulo, genero:genero, sinopsis:sinopsis, valoracion:valoracion, director:director})
        if(!serie){
            return res.status(404).send("La serie no se ha encontrado en la base de datos")
        }else{
            return res.send("La serie eliminado correctamente")
        }
    }catch(e){
        return res.status(500).send("Error al eliminar la serie")
    }

})

module.exports = router