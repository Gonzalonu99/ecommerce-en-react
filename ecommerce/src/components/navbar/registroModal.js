import React, { useState } from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import { IconButton, Typography, TextField, Radio } from "@mui/material";
import "./registro.css"
import 'animate.css';
import logo from "../../img/pizza_grosso.webp";
import { CheckBox, Close } from "@mui/icons-material";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  FormControl,
  InputLabel,
  OutlinedInput,
  InputAdornment,
} from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

const SignInModal = () => {
  const [open, setOpen] = useState(false);
  const [loginButtonDisabled, setLoginButtonDisabled] = React.useState(true);
  const [showPassword, setShowPassword] = React.useState(false);
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [phone, setPhone] = React.useState("");
  const [userType, setUserType] = useState("1");
  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  const handleNameChange = (event) => {
    setName(event.target.value);
    setLoginButtonDisabled(
      !(event.target.value && password && lastName && email && phone)
    );
  };
  const handleLastNameChange = (event) => {
    setLastName(event.target.value);
    setLoginButtonDisabled(
      !(event.target.value && password && name && email && phone)
    );
  };
  const handlePhoneChange = (event) => {
    setPhone(event.target.value);
    setLoginButtonDisabled(
      !(event.target.value && password && name && email && lastName)
    );
  };
  const handleEmailChange = (event) => {
    setEmail(event.target.value);
    setLoginButtonDisabled(
      !(event.target.value && password && name && lastName && phone)
    );
  };
  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
    setLoginButtonDisabled(
      !(event.target.value && email && name && lastName && phone)
    );
  };
  const handleSignInModal = () => {
    setOpen((prevState) => !prevState);
  };
  const handleSignIn = async () => {
    try {
      const response = await fetch("https://a365.com.ar/ecommerce/registrar", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          Nombre: name,
          Apellido: lastName,
          Email: email,
          Password: password,
          Telefono: phone,
          TipoUsuarioId: userType,
        }),
      });
      console.log(response);
      if (response.status === 200) {
        const data = await response.json();
        handleSignInModal(false);
        console.log("Registro de usuario exitoso: ", JSON.stringify(data));
        toast.success(`Cuenta creada con exito`, {
          position: "top-left",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
          theme: "light",
          className: 'mobile-toast',
          progressStyle:{
            background:"#C0FF00"
          },
        });
        setName("");
        setLastName("");
        setPhone("");
        setEmail("");
        setPassword("");
        setLoginButtonDisabled(true);
      } else {
        const data = await response.json();
        console.error("Registro fallido:", data.error);
      }
    } catch (error) {
      console.error("Error al registrarse:", error.message);
    }
  };
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 320,
    bgcolor: "background.paper",
    border: "2px solid #348759",
    boxShadow: 24,
    p: 4,
  };
  return (
    <React.Fragment>
      <Button onClick={handleSignInModal}>Regístrate</Button>
      <Modal
        open={open}
        onClose={handleSignInModal}
        aria-labelledby="child-modal-title"
        aria-describedby="child-modal-description"
      >
        <Box className="animate__animated animate__fadeIn" sx={{ ...style }}>
          <IconButton
            style={{ position: "absolute", zIndex: "3000", top: 0, right: 0 }}
            onClick={handleSignInModal}
          >
            <Close />
          </IconButton>
          
          <img className="register-logo-form animate__animated animate__fadeIn" src={logo} alt="Logo" />
         
          <Typography id="modal-register-title" variant="h6" component="h2">
            Crea tu cuenta
          </Typography>
          <Typography className="register-subtittle">
            Registrate completando todos los campos a continuacion
          </Typography> 
          <TextField className="input-register"
            required
            id="outlined-required-name"
            label="Name"
            value={name}
            onChange={handleNameChange}
          />
          <TextField className="input-register"
            required
            id="outlined-required-lastName"
            label="Last Name"
            value={lastName}
            onChange={handleLastNameChange}
          />
         
          <TextField className="input-register"
            required
            id="outlined-required-phone"
            label="Phone Number"
            value={phone}
            onChange={handlePhoneChange}
          />
          <TextField className="input-register"
            required
            id="outlined-email-input"
            label="Email"
            type="email"
            value={email}
            onChange={handleEmailChange}
          />
          <FormControl variant="outlined" required id="outlined-password-input">
            {" "}
            {/*el formControl es donde va el estilo del input del password*/}
            <InputLabel htmlFor="outlined-adornment-password">
              Password
            </InputLabel>
            <OutlinedInput
              id="outlined-adornment-password"
              type={showPassword ? "text" : "password"}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
              label="Password"
              value={password}
              onChange={handlePasswordChange}
            />
            
        
          </FormControl>
          <TextField
            required
            id="outlined-required"
            label="User Type"
            value={userType}
            style={{display:"none"}}
          />
          <Button  className="btn-register-confirm"
            variant="contained"
            style={{ backgroundColor: loginButtonDisabled ? 'grey' : '#d2342c' }}
            disabled={loginButtonDisabled}
            onClick={handleSignIn}
            >
            Crear cuenta
          </Button>
        </Box>
      </Modal>
    </React.Fragment>
  );
};

export default SignInModal;
