const express = require("express");
const router = express.Router();
const Users = require("../models/usuario");
const Peliculas = require("../models/peliculas").peliculas;
//const Serie = require("../models/series").series;
const Admin = require("../models/administrador").admin;

//Función que devuelve todos los usuarios
router.get("/", async function(req, res){
    try{
        const useresp = await Users.find();
        res.json(useresp);
    }catch(e){
        console.log("Error en la peticion get", e);
        res.status(400).send("Error en el servidor");
    }
})

//Petición tipo GET nos verifica si el usuario se encuentra en la base de datos y lo devuelve el usuario
router.post("/verify", async function(req, res){
    let email = req.body.email; //EJ administrador -> carlos@admin.AWFlix.es
    let contrasena = req.body.contrasena; //EJ administrador -> administrador
    
    await Users.findOne({email:email, contrasena:contrasena})
        .then(user=> {
        console.log(user);
        res.send(user);
    }).catch(e=> {
        console.log("Error al añadir un usuario", e);
        res.status(400).send("Error al encontrar el usuario en la base de datos");
    });

})

router.post("/usuario", async function(req, res){
    let email = req.body.email;
    console.log(email);
    try{
        let user = await Users.findOne({email:email});
        console.log(user);
        res.send(user);
    }catch(e){
        res.status(400).send("Error al encontrar el usuario en la base de datos");
    }

});

router.get("/listaPeliculas", async function(req, res){
    const {nombre, apellido, email, telefono, contrasena} = req.body

    try{
        const user = await Users.findOne({nombre:nombre, apellido:apellido, email:email, telefono:telefono, contrasena:contrasena});
        if (!user) {
            return res.status(404).send("Usuario no encontrado");
        }else{
            return res.json(user.peliculas)
        }
    }catch(e){
        console.log("Error ", e);
        return res.status(500).send("Error con la lista de las peliculas del usuario");
    }

})

router.get("/listaSeries", async function(req, res){
    const {nombre, apellido, email, telefono, contrasena} = req.body

    try{
        const user = await Users.findOne({nombre:nombre, apellido:apellido, email:email, telefono:telefono, contrasena:contrasena});
        if (!user) {
            return res.status(404).send("Usuario no encontrado");
        }else{
            return res.json(user.series)
        }
    }catch(e){
        console.log("Error ", e);
        return res.status(500).send("Error con la lista de las series del usuario");
    }

})

//Añadimos aquí un usuario
router.post("/", async function(req, res){
    const {nombre, apellido, email, telefono, contrasena} = req.body

    try{
        const usuario = {};

        usuario.nombre = nombre;
        usuario.apellido = apellido;
        usuario.email = email;
        usuario.telefono = telefono;
        usuario.contrasena = contrasena;

        const user = new Users(usuario);
        await user.save();

        return res.send("Usuario añadido correctamente")

    }catch(e){
        console.log("Error al añadir un usuario", e);
        return  res.status(400).send("Error al añadir un usuario");
    }

})

//Aqui añadiremos una pelicula a un cierto usuario
router.post("/addListaPeliculas", async function(req, res){
   
    const {nombre, apellido, email} = req.body;
    const {foto, titulo, genero, sinopsis, valoracion} = req.body;

    console.log(req.body);

    try{
        const user = await Users.findOne({nombre:nombre, apellido:apellido, email:email}); 
        console.log("*****************************************************" + user);
        if (!user) {
            return res.status(404).send("Usuario no encontrado");
        }

        const nuevaPelicula = new Peliculas({foto:foto, titulo:titulo, genero:genero, sinopsis:sinopsis, valoracion:valoracion})
        user.peliculas.push(nuevaPelicula); //Aqui añadimos la pelicula al usuario
        await user.save();
        return res.send("Pelicula añadida al usuario correctamente");
    }catch(e){
        console.log("Error ", e);
        return res.status(500).send("Error al cambiar algún dato del usuario");
    }

})

//Aqui añadiremos una serie a un cierto usuario
router.post("/listaSeries", async function(req, res){
    const {nombre, apellido, email, telefono, contrasena} = req.body
    const {foto, titulo, genero, sinopsis, valoracion, director} = req.body
    //console.log(nombre + ", " + apellido + ", " + email + ", " + telefono + ", " + contrasena)
    try{
        const user = await Users.findOne({nombre:nombre, apellido:apellido, email:email, telefono:telefono, contrasena:contrasena});
        //console.log(user)
        if (!user) {
            return res.status(404).send("Usuario no encontrado");
        }

        const nuevaSerie = new Serie({foto:foto, titulo:titulo, genero:genero, sinopsis:sinopsis, valoracion:valoracion, director:director})
        user.series.push(nuevaSerie); //Aqui añadimos la serie al usuario
        await user.save();
        return res.send("Serie añadida al usuario correctamente")
    }catch(e){
        console.log("Error ", e)
        return res.status(500).send("Error al cambiar algún dato del usuario")
    }

})

router.put("/", async function(req, res){
    const email = req.body.email //Busacmos al usuario por medio del email
    const {nombre, apellido, telefono, contrasena} = req.body
    
    try{
        const usuario = await Users.findOne({email:email});

        if(!usuario){
            res.status(404).send("Error usuario no encontrado")
        }else{
            usuario.nombre = nombre || usuario.nombre;
            usuario.apellido = apellido || usuario.apellido;
            usuario.telefono = telefono || usuario.telefono;
            usuario.contrasena = contrasena || usuario.contrasena;

            // Guarda los cambios en la base de datos
            const updatedUser = await usuario.save();
            res.json(updatedUser);
        }
    }catch(e){
        console.log("Error ", e)
        res.status(500).send("Error al cambiar algún dato del usuario")
    }

})

router.delete("/", async function(req, res){
    const {nombre, apellido, email, telefono, contrasena} = req.body

    try{
        const usuario = await Users.findOneAndDelete({nombre:nombre, apellido:apellido, email:email, telefono:telefono, contrasena:contrasena});
        if(!usuario){
            res.status(404).send("El usuario no se ha encontrado en la base de datos")
        }else{
            res.send("Usuario eliminado correctamente")
        }
    }catch(e){
        res.status(500).send("Error al eliminar el usuario")
    }
    
})

router.delete("/listaPeliculas", async function(req, res){
    const {nombre, apellido, email, telefono, contrasena} = req.body
    const {titulo, genero, sinopsis, valoracion, director} = req.body

    try{
        const user = await Users.findOne({nombre:nombre, apellido:apellido, email:email, telefono:telefono, contrasena:contrasena});
        let pelicula = user.peliculas.find(p => p.titulo === titulo)
        if(!user && !pelicula){
            return res.status(400).send("Error al eliminar una pelicula de la lista de peliculas del usuario")
        }else{
            user.peliculas.splice(user.peliculas.indexOf(pelicula), 1);
            await user.save();
            return res.send("La pelicula ha sido eliminada correctamente de la lista del usuario");
        }

    }catch(e){
        console.log(e)
        return res.status(500).send("Error al eliminar una pelicula de un usuario")
    }

})

router.delete("/listaSeries", async function(req, res){
    const {nombre, apellido, email, telefono, contrasena} = req.body
    const {titulo, genero, sinopsis, valoracion, director} = req.body

    try{
        const user = await Users.findOne({nombre:nombre, apellido:apellido, email:email, telefono:telefono, contrasena:contrasena});
        let serie = user.series.find(p => p.titulo === titulo)
        if(!user && !serie){
            return res.status(400).send("Error al eliminar una serie de la lista de peliculas del usuario")
        }else{
            user.series.splice(user.series.indexOf(serie), 1);
            await user.save();
            return res.send("La serie ha sido eliminada correctamente de la lista del usuario");
        }

    }catch(e){
        console.log(e)
        return res.status(500).send("Error al eliminar una serie de un usuario")
    }

})

module.exports = router