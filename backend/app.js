const express = require("express");
const cors = require("cors");
const dataBase = require("./db");

const app = express();
app.use(express.json());
app.use(cors());
dataBase();

app.use("/api/usuario", require("./routes/usuario"));
app.use("/api/visualizaciones", require("./routes/visualizaciones"));
app.use("/api/pendientes", require("./routes/pendientes"));
app.use("/api/favoritos", require("./routes/favoritos"));
app.use("/api/admin", require("./routes/admin"));
app.use("/api/peliculas", require("./routes/peliculas"));
app.use("/api/valoracion", require("./routes/valoracion"));
app.use("/api/contacto", require("./routes/contacto"));

if(process.env.NODE_ENV === "production"){
    app.use(express.static("../frontend/build"));
    app.get("*", (req, res) => {
        res.send(path.resolve(__dirname, "../frontend", "build", "index.html"));
    });
}

dataBase.connectDB().then(() => {
	app.listen(5000, function (req, res){
		console.log("Escuchando en 5000");

	});
}).catch((err)=> console.log("Base de datos no conectada"));
