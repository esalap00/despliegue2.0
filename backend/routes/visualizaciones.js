const express = require("express");
const router = express.Router();
const Visualizacion = require("../models/visualizaciones").visualizaciones;
const Peliculas = require("../models/peliculas").peliculas;
const User = require("../models/usuario");
const {ObjectId} = require('mongodb');

//Funcion devuelve las visualizaciones de un usuario de la base de datos de Anuel
router.post("/:idUser", async function(req, res){
    const idUser = req.params.idUser;
    const total = await Visualizacion.find({idUser: idUser});
    if(!total){
        console.log("El usuario no tiene ninguna película visualizada")
        res.sendStatus(404)
    }else res.send(total);
})

router.post("/", async function(req, res){
    const {idUser, titulo} = req.body
    console.log(idUser + " " + titulo);

    try{
        await Peliculas.find({titulo: titulo}).then(peliresp=> {
            const peliVisu = new Visualizacion({
                idUser: idUser, 
                idPelicula: peliresp[0]._id
            });
            peliVisu.save();
        });
        
        const total = await Visualizacion.find({idUser: idUser});
        res.send(total);

    }catch(e){
        res.status(400).send("Error al añadir una visualizacion a un usuario");
    }

})

router.delete("/", async function(req, res){
    const {idUser, idPelicula} = req.body

    try{
        const user = await User.findOne({_id:idUser});

        const userId = new ObjectId(idUser);  
        const peliculaId = new ObjectId(idPelicula);
        await Visualizacion.findOneAndDelete({idUser:userId, idPelicula:peliculaId});
        res.sendStatus(200);

    }catch(e){
        console.log("Error: ", e);
        res.status(500).send("Error al eliminar la visualizacion del usuario");
    }

})

module.exports = router