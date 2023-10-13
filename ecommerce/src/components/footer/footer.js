import React from "react";
import "../footer/footer.css";
import fb from "../../img/facebookLogo.webp";
import twitter from "../../img/twitterLogo.webp";
import instagram from "../../img/instagramLogo.webp";
import {Link} from "react-router-dom"
const Footer = () => {
  return (
    <div className="footer">
      <div className="sb__footer section__padding">
        <div className="sb__footer-links">
          <div className="sb__footer-links-div">
            <h4>Para empresas</h4>
            <a href="#">
              <p>Empleador</p>
            </a>
            <a href="#">
              <p>Plan de salud</p>
            </a>
            <a href="#">
              <p>Individuos</p>
            </a>
          </div>
          <div className="sb__footer-links-div">
            <h4>Recursos</h4>
            <a href="#">
              <p>Centro de recursos</p>
            </a>
            <a href="#">
              <p>Testimonios</p>
            </a>
            <a href="#">
              <p>STV</p>
            </a>
          </div>
          <div className="sb__footer-links-div">
            <h4>Partners</h4>
            <a href="#">
              <p>Swing tech</p>
            </a>
          </div>
          <div className="sb__footer-links-div">
            <h4>Compañía</h4>
            <Link to="/nosotros">Nosotros</Link>
            <Link to="/contacto">Contacto</Link>
          </div>
          <div className="sb__footer-links-div">
            <h4>Enlaces</h4>
            <a href="">
              <div>
                <p>Términos y condiciones</p>
              </div>
            </a>
            <a href="">
              <div>
                <p>Privacidad</p>
              </div>
            </a>
            <a href="">
              <div>
                <p>Seguridad</p>
              </div>
            </a>
            <a href="">
              <div>
                <p>Cookies</p>
              </div>
            </a>
          </div>
          <div className="sb__footer-links-div">
            <h4>Próximamente</h4>
            <div className="social-media">
              <p>
                <img src={fb} alt="Logo de Facebook"></img>
              </p>
              <p>
                <img src={twitter} alt="Logo de Twitter"></img>
              </p>
              <p>
                <img src={instagram} alt="Logo de Instagram"></img>
              </p>
            </div>
          </div>
        </div>

        <hr></hr>

        <div className="sb__footer-below">
          <p>
            &copy;{new Date().getFullYear()} Napoletana Grosso all right reserved
          </p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
