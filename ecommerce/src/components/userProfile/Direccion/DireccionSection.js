import React from "react";
import DireccionCard from "./DireccionCard";
import AddDireccion from "./AddDireccion";
import "./direccion.css";
const DireccionSection = () => {
  return (
    <>
      <div className="direccion-section">
        <AddDireccion />
      </div>
      <div style={{display:"flex", gap:"1.2rem", width:"100%", flexWrap:"wrap", justifyContent:"center"}}>
      <DireccionCard />
      </div>
      
    </>
  );
};

export default DireccionSection;
