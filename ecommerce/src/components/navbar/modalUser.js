import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { IconButton, TextField } from "@mui/material";
import { Close } from "@mui/icons-material";
import "./registro.css";
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
  const { handleLogin, isLoggedIn, handleLogout } = props;
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
  const handleSubmit = async (e) => {
    e.preventDefault();
    handleLogin(email, password);
    setEmail("");
    setPassword("");
    setLoginButtonDisabled(true);
    props.handleModalUser(false);
  };
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 320,
    bgcolor: "background.paper",
    borderRadius: "10px",
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
            <FormControl
              id="outlined-password-input-login"
              sx={{ width: "25ch" }}
              variant="outlined"
            >
              <InputLabel
                id="password-label"
                htmlFor="outlined-adornment-password-login"
              >
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
             className={`${loginButtonDisabled ? 'btn-login' : 'btn-active'}`}
              variant="contained"
              
              disabled={loginButtonDisabled}
              onClick={handleSubmit}
            >
              Iniciar sesión
            </Button>
            <a href="" className="restablecer-contraseña">
              olvidaste tu contraseña?
            </a>
            <div
              style={{
                width: "100%",
                height: "1px",
                backgroundColor: "#999",
                marginTop: "15px",
              }}
            />
            <p className="register-tittle">¿Aún no estas registrado?</p>
            <SignInModal />
          </Box>
        </Modal>
    </React.Fragment>
  );
};

export default ModalUser;
