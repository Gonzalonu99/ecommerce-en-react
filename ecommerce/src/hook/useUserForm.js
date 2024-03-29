import React, { useState, useEffect, createContext } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const FormContext = createContext();
const FormProvider = ({ children, isLoggedIn, userData}) => {
  const [formData, setFormData] = useState({});
  const [isEditable, setIsEditable] = useState(false);
  const [loading, setLoading] = useState(true);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  const handleEditClick = () => {
    setIsEditable(true);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
  };
  const handleSaveChanges = async (e) => {
    e.preventDefault();
    const editData = {
      UsuarioId: userData.usuarioId,
      Telefono: formData.telefono,
      Password: formData.password,
    };

    try {
      const response = await fetch(
        "https://a365.com.ar/ecommerce/updateUsuario",
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify(editData),
        }
      );

      if (response) {
        setIsEditable(false);
        toast.info(`Tus datos se editaron correctamente.`, {
          className: "mobile-toast",
          position: "top-left",
        });
  
        
      } else {
        console.error("Error en la solicitud POST");
        toast.error(`No se pudieron editar tus datos.`, {
          className: "mobile-toast",
          position: "top-left",
        });
      }
    } catch (error) {
      console.error("Error de red", error);
    }
  };
  const getUserId = () => {
    const usuarioId = localStorage.getItem("usuarioId");
    if (usuarioId) {
      return usuarioId;
    } else {
      return "";
    }
  };
  const getUserData = async () => {
    try {
      setLoading(true);
      const userId = getUserId();
      if (userId && isLoggedIn) {
        const response = await fetch(
          `https://a365.com.ar/ecommerce/getUserData/${userId}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        const userFormData = await response.json();

        setFormData({
          nombre: userFormData[0].Nombre,
          email: userFormData[0].Email,
          dni: userFormData[0].Dni,
          telefono: userFormData[0].Telefono,
          password: userFormData[0].Password,
        }); 
        // console.log("Form data: ", userFormData);
      } else {
        console.log("El usuario no esta autenticado o loggeado.");
      }
    } catch (error) {
      console.log("Error al ver tus datos de usuario: ", error);
    }
    finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getUserData();
  }, [isLoggedIn]);
  return (
    <FormContext.Provider
      value={{
        formData,
        setFormData,
        isEditable,
        handleChange,
        handleEditClick,
        handleSubmit,
        handleSaveChanges,
        getUserData,
        loading,
      }}
    >
      {children}
    </FormContext.Provider>
  );
};

export { FormProvider, FormContext };
