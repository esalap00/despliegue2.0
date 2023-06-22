const express = require("express");
const router = express.Router();
const Valoracion = require("../models/valoracion").valoracion;
const User = require("../models/usuario");
const {ObjectId} = require('mongodb');

//Añadir caso también un mismo usuario no puede tener 2 valoraciones de una misma pelicula
router.post("/", async function(req, res){
    const {idUser, idPelicula, valoracion} = req.body
    console.log(idUser + " " + idPelicula+ " " +  valoracion);
    try{
        const valoraPeli = new Valoracion({idUser: idUser, idPelicula: idPelicula, valoracion: valoracion});
        await valoraPeli.save();
        res.sendStatus(200);

    }catch(e){
        console.log(e)
        res.status(400).send("Error al añadir una valoración a una película de un usuario ", e);
    }

})

router.delete("/", async function(req, res){
    const {idUser, idPelicula} = req.body

    try{
        const user = await User.findOne({_id:idUser});
        if(!user){
            res.status(404);
        }else{
            const userId = new ObjectId(idUser);  
            const peliculaId = new ObjectId(idPelicula);
            await Valoracion.findOneAndDelete({idUser:userId, idPelicula:peliculaId});
            res.send("Pendiente eliminada correctamente");
        }
    }catch(e){
        console.log("Error: ", e);
        res.status(500).send("Error al eliminar la valoracion de una película a un usuario");
    }

})

module.exports = router