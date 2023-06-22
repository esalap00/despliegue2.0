const mongoose = require("mongoose");
const db = process.env.MONGO_URI;

const connectDB = async () => {
    try{
        await mongoose.connect(db, {
            
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("Base de datos conectada con Mongo");
    }catch(e){
        console.error(e);
        process.exit(1);
    }
};

module.exports = connectDB

