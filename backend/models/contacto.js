const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let contactoSchema = new Schema({

    idUser: {
        type: Object,
        required: true,
    },

    email: {
        type: String,
        required: true,
    },

    asunto: {
        type: String,
        required: true,
    },

    cuerpo: {
        type: String,
        required: true,
    },

    estado: {
        type: String,
        required: true,
    }

})

contacto = mongoose.model("contacto", contactoSchema);
module.exports = {contacto, contactoSchema}