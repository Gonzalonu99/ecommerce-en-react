import React from "react";
import "../footer/footer.css";
import facebook from "../../img/facebookFooter.webp";
import instagram from "../../img/instagramFooter.webp";
import { Link } from "react-router-dom";
import Logo from "../../img/pizza_grosso.webp";
const Footer = () => {
  return (
    <div className="footer">
      <div className="section-padding footer">
        <div className="footer-wrapper">
          <div className="footer-top-wrapper">
            <div className="footer-menu-wrapper">
              <img
                src={Logo}
                alt="Grosso Logo"
                className="footer-logo w-inline-block"
              />
              <div className="footer-menu-block">
                <div className="links-menu-block">
                  <Link to="/" className="footer-link w-inline-block">
                    Menu
                  </Link>
                  <Link to="/ubicacion" className="footer-link w-inline-block">
                    Ubicación
                  </Link>
                </div>
              </div>
              <div className="footer-menu-block">
                <div className="links-menu-block">
                  <Link to="/nosotros" className="footer-link w-inline-block">
                    Nosotros
                  </Link>
                  <Link to="/contacto" className="footer-link w-inline-block">
                    Contacto
                  </Link>
                </div>
              </div>
              <div className="footer-menu-block">
                <div className="footer-info-block">
                  <div className="footer-title">Horarios</div>
                  <div className="info-wrapper hours">
                    <div className="footer-info">
                      <div className="footer-bold-text">Lunes - Jueves</div>
                      <div className="footer-text">10 a.m. - 10 p.m.</div>
                    </div>
                    <div className="footer-info">
                      <div className="footer-bold-text">Viernes - Sábado</div>
                      <div className="footer-text">10 a.m. - 11 p.m.</div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="footer-menu-block location">
                <div className="footer-info-block">
                  <div className="footer-title">Visitanos</div>
                  <div className="footer-info-wrapper">
                    <div className="footer-info">
                      <div className="footer-bold-text">
                        Ing. Quartino 2176, B1714 Ituzaingó, Provincia de Buenos
                        Aires.
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="footer-middle-wrapper">
            <div className="footer-social-media-block">
              <div className="footer-title">Seguinos</div>
              <div className="social-media-icons-wrapper">
                <a
                  href=""
                  className="social-link w-inline-block"
                  target="_blank"
                >
                  <img
                    src={instagram}
                    alt="social media icon"
                    className="social-icon"
                  />
                </a>
                <a
                  href=""
                  className="social-link w-inline-block"
                  target="_blank"
                >
                  <img
                    src={facebook}
                    alt="social media icon"
                    className="social-icon"
                  />
                </a>
              </div>
            </div>
          </div>
          <div className="footer-bottom-wrapper">
            <div className="bottom-footer-block left">
              <div className="footer-text">
                &copy; {new Date().getFullYear()} Napoletana Grosso
              </div>
            </div>
            <div className="bottom-footer-block center">
              <a href="" className="footer-link-block w-inline-block">
                <div className="footer-text">Política de Privacidad</div>
              </a>
              <a href="" className="footer-link-block w-inline-block">
                <div className="footer-text terms">Términos de uso</div>
              </a>
            </div>
            <div className="bottom-footer-block right">
              <a href="" className="w-inline-block">
                <div className="footer-text created">
                  Website created by A.G.A
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
