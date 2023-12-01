import React from "react";
import AddIcon from "@mui/icons-material/Add";
import "./direccion.css";
import { Link } from "react-router-dom";

const AddDireccion = () => {
  return (
    <div className="btn-container">
      <Link to={"/mi-perfil/direcciones/agregarNuevaDireccion"} className="btn-add" style={{width:"100%", border:"none", background:"transparent"}}>
        <div className="btn-content">
          <AddIcon sx={{ width: "50px", height: "50px", opacity: ".2" }} />
          <h3>Agregar dirección</h3>
        </div>
      </Link>
    </div>
  );
};

export default AddDireccion;
