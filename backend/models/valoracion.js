const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let ValoracionShema = new Schema({

    idUser: {
        type: Object,
        required: true,
    },

    idPelicula: {
        type: Object,
        required: true,
    },
    
    //Mirar solo pueda ser hasta 10
    valoracion: {
        type: Number,
        min: 0,
        max: 10,
        required: true,
    }

})

valoracion = mongoose.model("valoraciones", ValoracionShema)
module.exports = {valoracion, ValoracionShema}