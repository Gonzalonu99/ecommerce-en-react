import React from "react";
import fb from "../../img/facebookLogo.webp";
import instagram from "../../img/instagramLogo.webp";
import "./redes.css";
const Redes = () => {
  return (
    <div className="redes-container">
      <div className="redes-section-padding">
        <div className="inline-redes-section">
          <h2 className="h2-heading centered">
            <strong className="bold-redes-text">Seguinos</strong> en nuestras
            redes para mantenerte actualizado.
          </h2>
          <div className="redes-icons">
            <a href="" className="ri-inline-block" target="_blank">
              <img src={fb} alt="redes-icon-fb" className="redes-icon" />
            </a>
            <a href="" className="ri-inline-block" target="_blank">
              <img
                src={instagram}
                alt="redes-icon-instagram"
                className="redes-icon"
              />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Redes;
