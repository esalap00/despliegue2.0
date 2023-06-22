const mongoose = require("mongoose");
const { peliculaSchema } = require("./peliculas");
const { visualizacionesSchema } = require("./visualizaciones");
const { favoritosSchema } = require("./favorito");
const Schema = mongoose.Schema;

let Users = new Schema({

    nombre: {
        type: String,
        required: true,
    },

    apellido: {
        type: String,
        required: true,
    },

    email: {
        type: String,
        required: true,
        unique: true,
    },

    telefono: {
        type: String,
        required: true,
    },

    contrasena: {
        type: String,
        required: true,
    },

    //Hacemos la listas de las peliculas y series 
    //pendientes:{ type: [peliculaSchema], default: [] },
    //administrador:{ type: [adminSchema], default: [] },
    //visualizaciones:{ type: [peliculaSchema], default: []},
    //favoritos: { type: [peliculaSchema], default: []},
})

module.exports = mongoose.model("users", Users);
