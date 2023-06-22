const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let peliculasSchema = new Schema({

    foto: { 
        type: String,
        required: true,
    },

    titulo: {
        type: String,
        required: true,
        unique: true,
    },

    genero: {
        type: String,
        required: true,
    },

    sinopsis: {
        type: String,
        required: true,
    },

    //Mirar solo pueda ser hasta 10
    valoracion: {
        type: Number,
        required: true,
    },

})

peliculas = mongoose.model("peliculas", peliculasSchema);
module.exports = {peliculas, peliculasSchema}