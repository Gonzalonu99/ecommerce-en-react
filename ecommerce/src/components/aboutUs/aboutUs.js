import React, { useState, useEffect } from "react";
import "./aboutUs.css";
import Foto1Grosso from "../../img/foto1Grosso.webp";
import Foto2Grosso from "../../img/foto2Grosso.webp";
import Foto3Grosso from "../../img/foto3Grosso.webp";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";

const AboutUs = () => {
  const [appeared1, setAppeared1] = useState(false);

  useEffect(() => {
    setAppeared1(true);
  }, []);
  return (
    <div className="au-section">
      <div className="section-padding">
        <div className="large-section-container">
          <div className="section">
            <div className={`_50-width-block align-center appear-from-right-1 ${appeared1 ? "appeared" : ""}`}>
              <img
                className={`au-img _1 ${appeared1 ? "appeared" : ""}`}
                src={Foto1Grosso}
                alt="au-img"
                loading="lazy"
              />
            </div>
            <div className="_50-width-block">
              <h2 className={`au-heading appear-from-right-3 ${appeared1 ? "appeared" : ""}`}>Nuestra Historia</h2>
              <p className={`_1-rem-paragraph appear-from-right-2 ${appeared1 ? "appeared" : ""}`}>
                Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                Recusandae hic eligendi eveniet doloribus? Hic et praesentium
                possimus recusandae, quaerat rerum dolor sit, fuga provident
                suscipit quidem libero. Adipisci, consequatur repellendus. Lorem
                ipsum dolor sit amet consectetur adipisicing elit. Deleniti,
                sunt. Sapiente esse dolorum, fugiat fuga quaerat voluptates.
                Necessitatibus, odio distinctio harum maiores neque fugit
              </p>
            </div>
          </div>
          <div className="section inverted">
            <div className="_50-width-block">
              <h2 className={`au-heading appear-from-right-2 ${appeared1 ? "appeared" : ""}`}>Nuestra Misión</h2>
              <p className={`_1-3-rem-paragraph appear-from-right-2 ${appeared1 ? "appeared" : ""}`}>
                Nuestra misión es simple pero ambiciosa:
              </p>
              <p className={`_1-rem-paragraph appear-from-right-3 ${appeared1 ? "appeared" : ""}`}>
                Hacer de Grosso la opción #1 para todos aquellos amantes de las
                pizzas!
              </p>
            </div>
            <div className={`_50-width-block align-center appear-from-right-1 ${appeared1 ? "appeared" : ""}`}>
              <img src={Foto2Grosso} alt="au-img2" className="au-img _2" />
            </div>
          </div>
          <div className="section">
            <div className={`_50-width-block align-center appear-from-right-3 ${appeared1 ? "appeared" : ""}`}>
              <img src={Foto3Grosso} alt="au-img-3" className="au-img _3" />
            </div>
            <div className="_50-width-block">
              <h2 className={`au-heading appear-from-right-1 ${appeared1 ? "appeared" : ""}`}>Visitanos Pronto</h2>
              <p className={`_1-3-rem-paragraph appear-from-right-2 ${appeared1 ? "appeared" : ""}`}>
                ¿Estás buscando pizzas con la mejor calidad para vos y tu
                familia? ¡Estás en el lugar correcto!
              </p>
              <p className={`_1-rem-paragraph appear-from-right-1 ${appeared1 ? "appeared" : ""}`}>
                Estamos ubicados en Ing. Quartino 2176, B1714 Ituzaingó, Provincia de Buenos Aires.
              </p>
              <Button className="au-btn">
                <Link to="/ubicacion" style={{color:"#fff"}}>Ver Ubicación</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
      <div className="divider"></div>
    </div>
  );
};

export default AboutUs;
