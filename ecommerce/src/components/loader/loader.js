import React from "react";
import Logo from "../../img/pizza_grosso.webp";
import "./loader.css";
const Loader = () => {
  return (
    <div className="loader-container">
      <div className="loader-logo-container">
        <img src={Logo} alt="loader" className="loader-logo" />
      </div>
      <h4 className="loader-h4">
        Cargando{" "}
        <span className="loader-h3-span">
          <span>.</span>
          <span>.</span>
          <span>.</span>
        </span>
      </h4>
    </div>
  );
};

export default Loader;
