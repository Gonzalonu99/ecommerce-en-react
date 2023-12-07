import React, { useContext, useEffect } from "react";
import "./direccion.css";
import { Button } from "@mui/material";
import { DireccionContext } from "../../../hook/useDireccionesForm";
import { FormContext } from "../../../hook/useUserForm";
import Loader from "../../loader/loader";
const DireccionCard = () => {
  const { direccionData, getDireccion, loading, setLoading } =
    useContext(DireccionContext);
  const { getUserData, formData } = useContext(FormContext);

  useEffect(() => {
    getUserData();
  }, []);

  useEffect(() => {
    getDireccion();
  }, []);

  return (
    <>
      {loading ? (
        <Loader/>
      ) : (
        direccionData &&
        direccionData.length > 0 &&
        direccionData.map((direccion) => {
          return (
            <div key={direccion.Id} className="card-container">
              <div className="card-state">
                <p>Predeterminada</p>
              </div>
              <div className="card-content">
                <div className="card-data">
                  <p style={{ color: "#222" }}>{formData.nombre}</p>
                  <p>
                    {direccion.Calle} {direccion.Altura}
                  </p>
                  <p>
                    {direccion.Ciudad}, {direccion.Provincia}{" "}
                    {direccion.CodigoPostal}
                  </p>
                  <p>Número de teléfono: {formData.telefono}</p>
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
        })
      )}
    </>
  );
};

export default DireccionCard;
