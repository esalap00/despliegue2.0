const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let adminSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true,
    },

    contrasena: {
        type: String,
        required: true,
    }
})

admin = mongoose.model("admin", adminSchema)
module.exports = {admin, adminSchema}