const express = require("express");
const router = express.Router();
const Favorito = require("../models/favorito").favorito;
const Peliculas = require("../models/peliculas").peliculas;
const User = require("../models/usuario");
const {ObjectId} = require('mongodb');

router.post("/:idUser", async function(req, res){
    const idUser = req.params.idUser;
    const total = await Favorito.find({idUser: idUser});
    res.send(total);
})

router.post("/", async function(req, res){
    const {idUser, titulo} = req.body
    console.log(titulo);
    try{
        await Peliculas.find({titulo: titulo}).then(peliresp=> {
            const peliPend = new Favorito({
                idUser: idUser, 
                idPelicula: peliresp[0]._id
            });
            peliPend.save();
        });
        
        const total = await Favorito.find({idUser: idUser});
        res.send(total);
        
    }catch(e){
        console.log(e)
        res.sendStatus(400);
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
            await Favorito.findOneAndDelete({idUser:userId, idPelicula:peliculaId});
            res.send("Favorito eliminado correctamente");
        }
    }catch(e){
        console.log("Error: ", e);
        res.status(500).send("Error al eliminar la favoritos del usuario")
    }

})

module.exports = router