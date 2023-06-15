import React from "react";
import banner from "../../img/banner.webp";
import "./banner.css";
import { Typography } from "@mui/material";

const Banner = () => {
  return (
   
      <div className="banner">
      <Typography variant="h2" className="banner-tittle">
            Bienvenido a Romero & Ajo
      </Typography>
        <Typography className="banner-sub-tittle" variant="body2">
        Descubre la excelencia culinaria en cada bocado. Productos comestibles envasados de alta calidad, <br/>
         cuidadosamente seleccionados para tu deleite. ¡Sabores auténticos te esperan!
        </Typography>
      </div>
 
  );
};

export default Banner;
