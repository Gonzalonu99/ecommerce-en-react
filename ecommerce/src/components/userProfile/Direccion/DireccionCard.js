import React, { useContext, useEffect } from "react";
import "./direccion.css";
import { Button } from "@mui/material";
import { DireccionContext } from "../../../hook/useDireccionesForm";
import { FormContext } from "../../../hook/useUserForm";
const DireccionCard = () => {
  const { direccionData, getDireccion } = useContext(DireccionContext);
  const {getUserData,formData} = useContext(FormContext)


  useEffect(() => {
    getUserData();
  }, []);
  
  useEffect(() => {
    getDireccion();
  
  }, []);

  return (
    <>
      {direccionData &&
        direccionData.length > 0 &&
        direccionData.map((direccion) => {
          return (
            <div key={direccion.Id} className="card-container">
              <div className="card-state">
                <p>Predeterminada</p>
              </div>
              <div className="card-content">
                <div className="card-data">
                  <p>Nombre: {formData.nombre}</p>
                  <p>Calle: {direccion.Calle}</p>
                  <p>Altura: {direccion.Altura}</p>
                  <p>Codigo postal: {direccion.CodigoPostal}</p>
                  <p>ciudad: {direccion.Ciudad}</p>
                  <p>Provincia: {direccion.Provincia}</p>
                </div>
              </div>
              <div>
                <Button
                  variant="ghost"
                  sx={{ color: "#D2342C", fontSize: "13px" }}
                >
                  Predeterminar
                </Button>
                |
                <Button
                  variant="ghost"
                  sx={{ color: "#D2342C", fontSize: "13px" }}
                >
                  Eliminar
                </Button>
              </div>
            </div>
          );
        })}
    </>
  );
};

export default DireccionCard;
