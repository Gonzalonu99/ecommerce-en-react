import React from "react";
import "../footer/footer.css";
import fb from "../../img/facebookLogo.webp";
import twitter from "../../img/twitterLogo.webp";
import instagram from "../../img/instagramLogo.webp";

const Footer = () => {
  return (
    <div className="footer">
      <div className="sb__footer section__padding">
        <div className="sb__footer-links">
          <div className="sb__footer-links-div">
            <h4>For businnes</h4>
            <a href="#">
              <p>Employer</p>
            </a>
            <a href="#">
              <p>Healt plan</p>
            </a>
            <a href="#">
              <p>Individuals</p>
            </a>
          </div>
          <div className="sb__footer-links-div">
            <h4>Resources</h4>
            <a href="#">
              <p>Resource center</p>
            </a>
            <a href="#">
              <p>Testimonials</p>
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
            <h4>Company</h4>
            <a href="#">
              <p>About</p>
            </a>
            <a href="#">
              <p>Press</p>
            </a>
            <a href="#">
              <p>Carrer</p>
            </a>
            <a href="#">
              <p>Contact</p>
            </a>
          </div>
          <div className="sb__footer-links-div">
          <h4>Links</h4>
            <a href="">
              <div>
                <p>Terminos y condiciones</p>
              </div>
            </a>
            <a href="">
              <div>
                <p>Privacy</p>
              </div>
            </a>
            <a href="">
              <div>
                <p>Security</p>
              </div>
            </a>
            <a href="">
              <div>
                <p>Cookies</p>
              </div>
            </a>
          </div>
          <div className="sb__footer-links-div">
            <h4>Coming soon</h4>
            <div className="social-media">
              <p>
                <img src={fb} alt="facebookLogo"></img>
              </p>
              <p>
                <img src={twitter} alt="twitterLogo"></img>
              </p>
              <p>
                <img src={instagram} alt="instagramLogo"></img>
              </p>
            </div>
          </div>
        </div>

        <hr></hr>

        <div className="sb__footer-below">
            <p>&copy;{new Date().getFullYear()} Romero y Ajo all right reserved</p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
