const express = require("express");
const router = express.Router();
const Contacto = require("../models/contacto").contacto;
const {ObjectId} = require('mongodb');

//Función que devuelve toda la tabla de contactos
router.get("/", async function(req, res){
    try{
        const todaTabla = await Contacto.find();
        res.send(todaTabla);
    }catch(e){
        console.log("Error ", e);
        res.sendStatus(400);
    }
})

//Función que devuelve todos los contactos de un mismo usuario
router.post("/:idUser", async function(req, res){
    const idUser= req.params.idUser;
    console.log(idUser);
    const total = await Contacto.find({idUser: idUser});

    if(!total){
        console.log("No existe ningún tipo de contacto");
        res.sendStatus(404);
    }

    res.send(total);
})

//Función que devuelve un contacto según id
router.post("/consulta/:idContacto", async function(req, res){
    console.log(req.params.idContacto);
    const idContacto= new ObjectId(req.params.idContacto);
    const total = await Contacto.find({_id: idContacto});
    res.send(total);
})

//Función que devuelve un contacto según id
router.put("/:idContacto", async function(req, res){
    console.log(req.params.idContacto);
    const idContacto = req.params.idContacto;
    const total = await Contacto.findOneAndUpdate(
        idContacto,
        {
            estado: "cerrada"
        }
    );
    const todaTabla = await Contacto.find();
    res.send(todaTabla);
})

//Nuevo Contacto
router.post("/", async function(req, res){
    const {idUser, email, asunto, cuerpo, estado} = req.body;
    console.log(idUser)
    try{
        const contactoNuevo = new Contacto({idUser: idUser, email: email, asunto: asunto, cuerpo: cuerpo, estado: estado});
        await contactoNuevo.save();
        res.sendStatus(200);
    }catch(e){
        console.log("Error: ", e);
        res.status(400);
    }

})

module.exports = router;