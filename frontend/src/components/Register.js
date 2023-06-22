import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import styled from "@emotion/styled";
import Image from "../images/awflix.png";
import Footer from "./Footer";
import {
  AppBar,Box,Toolbar,Typography,IconButton,MenuItem,Menu,TextField,DialogContent,DialogContentText,
  DialogTitle,Dialog,Button,FormGroup,FormControlLabel,Checkbox,
} from "@mui/material";
import { AccountCircle, Send as SendIcon } from "@mui/icons-material";

const Img = styled("img")({
  margin: "auto",
  display: "block",
  maxWidth: "9%",
  maxHeight: "9%",
});


export default function MenuAppBar() {
  //Variable creada para volver a la pantalla de inicio
  const navigate = useNavigate();

  const [auth, setAuth] = React.useState(true);
  const [anchorEl, setAnchorEl] = React.useState(null);

  //const {contrasena} = useParams();
  const [nombre, setNombre] = React.useState();
  const [apellido, setApellido] = React.useState();
  const [email, setEmail] = React.useState();
  const [contrasena, setContrasena] = React.useState();
  const [telefono, setTelefono] = React.useState();
  const [rol, setRol] = React.useState();
  const [botonCheck, setBotonCheck] = React.useState(true);
  const [menuAvatar, setMenuAvatar] = React.useState(true);

  const handleChange = (event) => {
    setAuth(event.target.checked);
  };

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  //Variables y funciones para escoger el rol
  const [escogerRol, setEscogerRol] = React.useState(false);
  const handleOpenEscogerRol = () => {
    setEscogerRol(true);
  };
  const handleCloseEscogerRol = () => {
    setEscogerRol(false);
  };

  //Variables y funciones para añadir un botón
  const [open, setOpen] = React.useState(false);
  const handleClickOpenButton = () => {
    setOpen(true);
  };
  const handleCloseButton = () => {
    setOpen(false);
  };


  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const nombre = data.get("nombre");
    const apellidos = data.get("apellidos");
    const email = data.get("E-mail");
    const contra = data.get("contra");
    const contra2 = data.get("contra2");
    let telefono = data.get("telefono");


    if(telefono===""){
      telefono = " ";
    } 


  if(contra!==contra2){
      alert("Las contraseñas no son iguales")
    }else{
      axios.post("http://localhost:5000/usuario/", {
        nombre: nombre,
        apellido: apellidos,
        email: email,
        telefono: telefono,
        contrasena: contra
      }).then(response => {
        sessionStorage.setItem("usuario", email);
        navigate("/Bienvenida/vistaUser");

      }).catch(err => {
        alert(err);
      })
    }
  }

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" sx={{ backgroundColor: "black" }}>
        <Toolbar>
          <Box
            sx={{
              flexGrow: 1,
              display: "flex",
              justifyContent: "center",
            }}
          >
            <img
              src={Image}
              alt="Logo de AWFLIX"
              style={{
                display: "block",
                margin: "auto",
                maxWidth: "9%",
                maxHeight: "9%",
                marginRight: "auto",
                marginLeft: "calc(50% - 20px)",
              }}
            />
          </Box>
          {auth && (
            <div>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <MenuItem onClick={(e) => navigate("/login")}>logout</MenuItem>
                <MenuItem onClick={handleClickOpenButton}>
                  Normas Empresa
                </MenuItem>

                <Dialog open={open} onClose={handleCloseButton}>
                  <DialogTitle>Politicas de Privacidad</DialogTitle>
                  <DialogContent>
                    <DialogContentText>
                      1. Según la ley orgánica del 15/1999 queda totalmente
                      prohibido compartir datos personales de los usuarios.
                    </DialogContentText>
                    <DialogContentText>
                      2. Según la ley orgánica del 5/1992 todo usuario podrá
                      cambiar sus datos si es solicitado.
                    </DialogContentText>
                    <DialogContentText>
                      3. Según la ley orgánica del 3/2018 los usuarios solo
                      podrán ver sus propios datos.
                    </DialogContentText>
                  </DialogContent>
                </Dialog>
              </Menu>
            </div>
          )}
        </Toolbar>
      </AppBar>

      <Box component="form" noValidate autoComplete="off" disable onSubmit={handleSubmit}>
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <TextField
            label="Nombre"
            name="nombre"
            id="standard-start-adornment"
            sx={{ m: 1, width: "25ch" }}
            variant="standard"
            required
            onChange={(e) => {
              setNombre(e.target.value);
            }}
          />
        </Box>

        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <TextField
            label="Apellidos"
            id="standard-start-adornment"
            sx={{ m: 1, width: "25ch" }}
            variant="standard"
            required
            name="apellidos"
            onChange={(e) => {
              setApellido(e.target.value);
            }}
          />
        </Box>

        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <TextField
            variant="standard"
            sx={{ m: 1, width: "25ch" }}
            id="outlined-required"
            label="E-mail"
            required
            name="E-mail"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
        </Box>

        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <TextField
            type="password"
            variant="standard"
            sx={{ m: 1, width: "25ch" }}
            id="outlined-required"
            label="Contraseña"
            required
            name="contra"
            onChange={(e) => {
              setContrasena(e.target.value);
            }}
          />
        </Box>

        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <TextField
            type="password"
            variant="standard"
            sx={{ m: 1, width: "25ch" }}
            id="outlined-required"
            label="Repita la contraseña"
            required
            name="contra2"
            onChange={(e) => {
              setContrasena(e.target.value);
            }}
          />
        </Box>

        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <TextField
            variant="standard"
            sx={{ m: 1, width: "25ch" }}
            id="outlined-required"
            label="Número Telefónico"
            name="telefono"
            onChange={(e) => {
              setTelefono(e.target.value);
            }}
          />
        </Box>

        {menuAvatar && (
            <div>
              <MenuItem>Log Out</MenuItem>
              <MenuItem>Normas Empresa</MenuItem>
            </div>
          ) &&
          setMenuAvatar(false)}

        <Box
          sx={{ display: "flex", justifyContent: "center" }}
          onClick={(e) => setBotonCheck(false)}
        >
          <FormGroup>
            <FormControlLabel
              control={<Checkbox defaultChecked />}
              label="Acepto las condiciones de usuario"
            />
          </FormGroup>
        </Box>

        <Box sx={{ display: "flex", justifyContent: "right" }}>
          <Button
            type="submit"
            variant="contained"
            color="error"
            endIcon={<SendIcon />}
            sx={{
              mt: 3,
              borderRadius: "25px",
              padding: "6px 16px",
              fontWeight: "bold",
              textTransform: "capitalize",
              alignSelf: "center",
              display: "block",
              margin: "0 auto",
              backgroundColor: "error.main",
            }}
            
          >
            Registrarme
          </Button>
        </Box>
        <Footer />
      </Box>
    </Box>
  );
}
