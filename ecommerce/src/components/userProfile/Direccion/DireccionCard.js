import React, { useContext } from "react";
import "./direccion.css";
import { Button } from "@mui/material";



const DireccionCard = () => {

  return (
    <div className="card-container">
      <div className="card-state">
        <p>Predeterminada</p>
      </div>
      <div className="card-content">
        <div className="card-data">
          <p>usermame</p>
          <p>calle</p>
          <p>otras cosas</p>
        </div>
      </div>
      <div>
        <Button variant="ghost" sx={{ color: "#D2342C", fontSize: "13px" }}>
          Predeterminar
        </Button>
        |
        <Button variant="ghost" sx={{ color: "#D2342C", fontSize: "13px" }}>
          Eliminar
        </Button>
      </div>
    </div>
  );
};

export default DireccionCard;
