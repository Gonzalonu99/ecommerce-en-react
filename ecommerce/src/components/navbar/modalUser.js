import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { IconButton, TextField } from "@mui/material";
import { Close } from "@mui/icons-material";
import {
  FormControl,
  InputLabel,
  OutlinedInput,
  InputAdornment,
  Button,
} from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import SignInModal from "./registroModal";

const ModalUser = (props) => {
  const [showPassword, setShowPassword] = React.useState(false);
  const [loginButtonDisabled, setLoginButtonDisabled] = React.useState(true);
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  const handleEmailChange = (event) => {
    setEmail(event.target.value);
    setLoginButtonDisabled(!(event.target.value && password));
  };
  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
    setLoginButtonDisabled(!(event.target.value && email));
  };
  const handleLogin = async () => {
    try {
      const response = await fetch("http://a365.com.ar/ecommerce/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ Email: email, Password: password }),
      });
      console.log(response);
      if (response.status === 200) {
        const data = await response.json();
        // El inicio de sesión fue exitoso, puedes hacer lo que quieras aquí
        props.handleModalUser(false);
        console.log("Inicio de sesión exitoso");
        console.log(data);
        if (data.success === true) {
          alert("Inicio de sesión exitoso");
        } else {
          alert("Inicio de sesión fallido");
          props.handleModalUser(true);
          setEmail("");
          setPassword("");
          setLoginButtonDisabled(true);
        }
      } else {
        // El inicio de sesión falló, muestra un mensaje de error
        const data = await response.json();
        console.error("Inicio de sesión fallido:", data.error);
      }
    } catch (error) {
      console.error("Error al iniciar sesión:", error.message);
    }

    // Finalmente, limpia los campos de email y password y desactiva el botón
    setEmail("");
    setPassword("");
    setLoginButtonDisabled(true);
  };
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 320,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };
  return (
    <React.Fragment>
      <Modal open={props.modalOpen}>
        <Box sx={style}>
          <IconButton
            style={{ position: "absolute", zIndex: "3000", top: 0, right: 0 }}
            onClick={props.handleModalUser}
          >
            <Close />
          </IconButton>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Ya soy cliente
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Ingresá usando tu email y contraseña
          </Typography>
          <TextField
            id="outlined-email-input-login"
            label="Email"
            type="email"
            style={{ m: 1, width: "25ch" }}
            value={email}
            onChange={handleEmailChange}
          />
          <FormControl sx={{ m: 1, width: "25ch" }} variant="outlined">
            <InputLabel htmlFor="outlined-adornment-password-login">
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
          <Button
            variant="contained"
            color="primary"
            disabled={loginButtonDisabled}
            onClick={handleLogin}
          >
            Iniciar sesión
          </Button>
          <div
            style={{
              width: "100%",
              height: "1px",
              backgroundColor: "#999",
              marginTop: "15px",
            }}
          />
          <SignInModal/>
        </Box>
      </Modal>
    </React.Fragment>
  );
};

export default ModalUser;
