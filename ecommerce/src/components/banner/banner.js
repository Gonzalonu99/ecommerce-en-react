import React from "react";
import banner from "../../img/banner.webp";
import "./banner.css";
import { Typography, Button } from "@mui/material";
import { Link } from "react-router-dom";

const Banner = (props) => {
  const {scrollToCategory} = props;
  return (
    <>
      <div className="banner">
        <Typography variant="h2" className="banner-tittle">
          ¡Pizza Grosso te va a enamorar con sus sabores!
        </Typography>

        <Typography variant="body3" className="banner-sub-tittle">
          ¿Estas buscando Pizzas al mejor estilo Italiano?
        </Typography>
        <Typography variant="body3" className="banner-sub-tittle-2">
          Estas en el lugar correcto
        </Typography>
        <div>
          <Button className="btn-banner" onClick={()=> scrollToCategory("carrusel")}>Carta digital</Button>
          <Button className="btn-banner-negro">
            <Link to="/contacto" style={{ color: "#fff" }}>
              Contacto
            </Link>
          </Button>
        </div>
      </div>
    </>
  );
};

export default Banner;
