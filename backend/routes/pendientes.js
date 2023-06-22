const express = require("express");
const router = express.Router();
const Pendientes = require("../models/pendientes").pendientes;
const Peliculas = require("../models/peliculas").peliculas;
const User = require("../models/usuario");
const {ObjectId} = require('mongodb');//para convertir los string a objectId 

//Funcion devuelve el contenido pendiente de un usuario 
router.post("/:idUser", async function(req, res){
    console.log("*****************************");
    const idUser = req.params.idUser;
    const total = await Pendientes.find({idUser: idUser});
    res.send(total);
})

router.post("/", async function(req, res){
    const {idUser, titulo} = req.body
    console.log(titulo);
    try{
        await Peliculas.find({titulo: titulo}).then(peliresp=> {
            const peliPend = new Pendientes({
                idUser: idUser, 
                idPelicula: peliresp[0]._id
            });
            peliPend.save();
        });
        
        const total = await Pendientes.find({idUser: idUser});
        res.send(total);
        
    }catch(e){
        console.log(e)
        res.status(400).send("Error al añadir la película a su lista de pendientes de ver", e);
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
            await Pendientes.findOneAndDelete({idUser:userId, idPelicula:peliculaId});
            res.send("Pendiente eliminada correctamente");
        }
    }catch(e){
        console.log("Error: ", e);
        res.status(500).send("Error al eliminar la pendiente del usuario");
    }

})

module.exports = router;