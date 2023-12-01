import React, { useContext, useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { toast } from "react-toastify";
import { FormContext } from "../../../hook/useUserForm";

const Form = () => {
  const {
    formData,
    handleSubmit,
    handleChange,
    isEditable,
    handleEditClick,
    handleSaveChanges,
  } = useContext(FormContext);
  return (
    <Container>
    <h4 style={{textAlign:"center"}}>MIS DATOS 🍕</h4>
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
            <label htmlFor="telefono">Télefono:</label>
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
            <Button
              onClick={handleSaveChanges}
              type="submit"
              variant="contained"
              sx={{ backgroundColor: "#d2342c" }}
            >
              Guardar cambios
            </Button>
          ) : (
            <Button
              variant="contained"
              sx={{ backgroundColor: "#d2342c" }}
              onClick={handleEditClick}
            >
              Editar mis datos
            </Button>
          )}
        </div>
      </form>
      <div className="form-button-tienda">
        <Button variant="ghost">
          {" "}
          <span>{"<"}</span>
          <Link style={{ color: "black" }} to={"/"}>
            Volver a la tienda
          </Link>
        </Button>
      </div>
    </Container>
  );
};
export default Form;