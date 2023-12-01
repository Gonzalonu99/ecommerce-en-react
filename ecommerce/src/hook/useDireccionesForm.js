import React, { useState, useEffect, createContext } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const DireccionContext = createContext();

const DireccionProvider = ({ children, isLoggedIn, userData }) => {
  const [direccionData, setDireccionData] = useState({});
  const [direccionPostData, setDireccionPostData] = useState({});
  const [isEditable, setIsEditable] = useState(false);

  const getUserId = () => {
    const usuarioId = localStorage.getItem("usuarioId");
    if (usuarioId) {
      return usuarioId;
    } else {
      return "";
    }
  };

  const handleEditClick = () => {
    setIsEditable(true);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDireccionData({ ...direccionData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const getDireccion = async () => {
    try {
      const userId = getUserId();
      if (userId && isLoggedIn) {
        const response = await fetch(
          `https://a365.com.ar/ecommerce/getDirecciones/${userId}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        const getDireccionData = await response.json();
        setDireccionData(getDireccionData);
        // console.log("Direcciones: ", getDireccionData);
      }
    } catch (error) {
      console.log(error);
    }
  };



  const agregarDireccion = async () => {
    try {
      const userId = getUserId();
      if (userId && isLoggedIn) {
        const direccion = {
          UsuarioId: parseInt(userId),
          Calle: direccionData.Calle,
          Altura: parseInt(direccionData.Altura),
          Ciudad: direccionData.Ciudad,
          Provincia: direccionData.Provincia,
          CodigoPostal: parseInt(direccionData.CodigoPostal),
        };

        const response = await fetch(
          `https://a365.com.ar/ecommerce/addDireccion`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
            body: JSON.stringify(direccion),
          }
        );

        const postDireccionData = await response.json();
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <DireccionContext.Provider
      value={{
        getDireccion,
        direccionData,
        agregarDireccion,
        isEditable,
        handleChange,
        handleEditClick,
        handleSubmit,
      }}
    >
      {children}
    </DireccionContext.Provider>
  );
};

export { DireccionContext, DireccionProvider };
