import React from "react";
import DireccionCard from "./DireccionCard";
import AddDireccion from "./AddDireccion";
import "./direccion.css";
const DireccionSection = () => {
  return (
    <div className="direccion-section">
      <AddDireccion />
      <DireccionCard />
    </div>
  );
};

export default DireccionSection;
