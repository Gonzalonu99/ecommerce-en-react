import React, { useContext, useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { toast } from "react-toastify";
import { DireccionContext } from "../../../../hook/useDireccionesForm";

const EnviosForm = () => {
  const {
    direccionData,
    agregarDireccion,
    isEditable,
    handleChange,
    handleEditClick,
    handleSubmit,
  } = useContext(DireccionContext);
  return (
    <Container>
      <h4 style={{ textAlign: "center" }}>Agrega tu nueva direccion</h4>
      <form style={{ marginTop: "65px" }} onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <label htmlFor="calle">Calle:</label>
            <TextField
              sx={{ backgroundColor: "#F2F2F2" }}
              fullWidth
              name="Calle"
              value={direccionData.Calle}
              onChange={handleChange}
              margin="normal"
              variant="outlined"
              disabled={!isEditable}
            />
          </Grid>
          <Grid item xs={6}>
            <label htmlFor="altura">Altura:</label>
            <TextField
              sx={{ backgroundColor: "#F2F2F2" }}
              fullWidth
              name="Altura"
              value={direccionData.Altura}
              onChange={handleChange}
              margin="normal"
              variant="outlined"
              type="number"
              disabled={!isEditable}
            />
          </Grid>
          <Grid item xs={6}>
            <label htmlFor="ciudad">Ciudad:</label>
            <TextField
              sx={{ backgroundColor: "#F2F2F2" }}
              fullWidth
              name="Ciudad"
              value={direccionData.Ciudad}
              onChange={handleChange}
              margin="normal"
              variant="outlined"
              disabled={!isEditable}
            />
          </Grid>
          <Grid item xs={6}>
            <label htmlFor="provincia">Provincia:</label>
            <TextField
              sx={{ backgroundColor: "#F2F2F2" }}
              fullWidth
              name="Provincia"
              value={direccionData.Provincia}
              onChange={handleChange}
              margin="normal"
              variant="outlined"
              disabled={!isEditable}
            />
          </Grid>
          <Grid item xs={6}>
          <label htmlFor="provincia">Codigo Postal:</label>
            <TextField
              sx={{ backgroundColor: "#F2F2F2" }}
              fullWidth
              name="CodigoPostal"
              value={direccionData.CodigoPostal}
              onChange={handleChange}
              margin="normal"
              variant="outlined"
              type="number"
              disabled={!isEditable}
            />
          </Grid>
        </Grid>
        <div className="btn-edit-form">
          {isEditable ? (
            <Button
              onClick={agregarDireccion}
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
export default EnviosForm;
