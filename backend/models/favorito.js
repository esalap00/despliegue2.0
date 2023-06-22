const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let favoritosSchema = new Schema({
    
    idUser: {
        type: Object,
        required: true,
    },

    idPelicula: {
        type: Object,
        required: true,
    },

})

favorito = mongoose.model("favorito", favoritosSchema);
module.exports = {favorito, favoritosSchema}