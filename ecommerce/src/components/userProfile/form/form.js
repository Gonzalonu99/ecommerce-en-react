import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import { useEffect } from "react";

const Form = ({ userData }) => {
  const [formData, setFormData] = useState({
    nombre: userData.nombre,
    email: userData.email,
    dni: "",
    telefono: userData.telefono,
  });

  const [isEditable, setIsEditable] = useState(false); // Nuevo estado para habilitar/deshabilitar el formulario

  useEffect(() => {
    setFormData({
      nombre: userData.nombre,
      email: userData.email,
      dni: userData.dni,
      telefono: userData.telefono,
    });
  }, [userData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleEditClick = () => {
    // Cambiar el estado de isEditable cuando se hace clic en "Editar mis datos"
    setIsEditable(true);
  };

  const handleSubmit = (e) => {
 e.preventDefault()

  };

  const handleSaveChanges = (e) =>{
    e.preventDefault()
    setIsEditable(false)
  }

  return (
    <Container>
      <form style={{ marginTop: "65px" }} onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <label htmlFor="name">Nombre:</label>
            <TextField
              sx={{ backgroundColor: "#F2F2F2" }}
              fullWidth
              name="nombre"
              value={formData.nombre}
              onChange={handleChange}
              margin="normal"
              variant="outlined"
              disabled={!isEditable}
            />
          </Grid>
          <Grid item xs={6}>
            <label htmlFor="email">Email:</label>
            <TextField
               sx={{ backgroundColor: "#F2F2F2" }}
              fullWidth
              name="email"
              value={formData.email}
              onChange={handleChange}
              margin="normal"
              variant="outlined"
              disabled={!isEditable}
            />
          </Grid>
          <Grid item xs={6}>
            <label htmlFor="dni">DNI:</label>
            <TextField
               sx={{ backgroundColor: "#F2F2F2" }}
              fullWidth
              name="DNI"
              value={formData.dni}
              onChange={handleChange}
              margin="normal"
              variant="outlined"
              disabled={!isEditable}
            />
          </Grid>
          <Grid item xs={6}>
            <label htmlFor="telefono">Telefono:</label>
            <TextField
             sx={{ backgroundColor: "#F2F2F2" }}
              fullWidth
              name="telefono"
              value={formData.telefono}
              onChange={handleChange}
              margin="normal"
              variant="outlined"
              disabled={!isEditable}
            />
          </Grid>

          <Grid item xs={6}>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
              }}
            >
              <label>Fecha de nacimiento:</label>
              <input
               disabled={!isEditable}
                style={{
                  backgroundColor: "#F2F2F2",
                  padding: ".6rem .6rem",
                  marginBottom: "1rem",
                }}
                type="date"
              />
            </div>
          </Grid>

        </Grid>
        <div className="btn-edit-form">
          {isEditable ? (
            <Button onClick={handleSaveChanges} type="submit" variant="contained" sx={{ backgroundColor: "#d2342c" }}>
              Guardar cambios
            </Button>
          ) : (
            <Button variant="contained" sx={{ backgroundColor: "#d2342c" }} onClick={handleEditClick}>
              Editar mis datos
            </Button>
          )}
        </div>
      </form>
     
      <div className="form-button-tienda">
      <Button variant="ghost"> <span>{"<"}</span>Volver a la tienda</Button>
      </div>
    </Container>
    
  );
};
export default Form;
