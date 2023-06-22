const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let pendientesSchema = new Schema({

    idUser: {
        type: Object,
        required: true,
    },

    idPelicula: {
        type: Object,
        required: true,
    },

})

pendientes = mongoose.model("pendientes", pendientesSchema);
module.exports = {pendientes, pendientesSchema}