const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let visualizacionesSchema = new Schema({

    idUser: {
        type: Object,
        required: true,
    },

    idPelicula: {
        type: Object,
        required: true,
    },
    
})

visualizaciones = mongoose.model("visualizaciones", visualizacionesSchema);
module.exports = {visualizaciones, visualizacionesSchema}