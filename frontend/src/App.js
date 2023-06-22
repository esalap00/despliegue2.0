import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom"

import * as React from 'react';
import UserNav from "./components/Register";
import Login from "./components/Login";
import Bienvenida from "./components/Bienvenida";
import VistaUser from "./components/VistaUser";
import VistaUserPendientes from "./components/vistaUserPendientes";
import VistaUserVistas from "./components/vistaUserVistas";
import VistaUserFavoritos from "./components/vistaUserFavoritos";
import VistaAdmin from "./components/VistaAdmin";
import Valoracion from "./components/Valoracion";
import Contacto from "./components/Contacto";
import ConsultasAdmin from "./components/ConsultasAdmin";
import Respuesta from "./components/Respuesta";
import ConsultasUsuario from "./components/ConsultasUsuario";

export default function App() {
  return (
    <Router>
        <div>
            <Routes>
                <Route path="/" element = {<Navigate to="Bienvenida"/>}/>
                <Route path="/Bienvenida" element = {<Bienvenida/>}/>
                <Route path="/Bienvenida/login" element = {<Login/>}/>
                <Route path="/Bienvenida/userSignUp" element = {<UserNav/>}/>
                <Route path="/Bienvenida/vistaUser" element = {<VistaUser/>}/>
                <Route path="/Bienvenida/vistaUserPendientes/:idUser" element = {<VistaUserPendientes/>}/>
                <Route path="/Bienvenida/vistaUserVistas/:idUser" element = {<VistaUserVistas/>}/>
                <Route path="/Bienvenida/vistaUserFavoritos/:idUser" element = {<VistaUserFavoritos/>}/>
                <Route path="/Bienvenida/vistaAdmin" element = {<VistaAdmin/>}/>
                <Route path="/Bienvenida/valoracion/:idUser/:idPelicula" element = {<Valoracion/>}/>
                <Route path="/Bienvenida/contacto/:idUser" element = {<Contacto/>}/>
                <Route path="/consultasAdmin" element = {<ConsultasAdmin/>}/>
                <Route path="/respuesta/:idConsulta" element = {<Respuesta/>}/>
                <Route path="/consultasUsuario/:idUser" element = {<ConsultasUsuario/>}/>
            </Routes>
        </div>
    </Router>
  );
}