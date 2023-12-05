import React from "react";
import "./location.css";
import { Button } from "@mui/material";

const Location = () => {
  return (
    <div className="location-section">
      <div className="location-banner">
        <div className="location-section-padding">
          <div className="space-banner-wrapper">
            <h1 className="lt-h1-heading">Nuestra Ubicación</h1>
          </div>
        </div>
      </div>
      <div className="map-section">
        <div className="location-section-padding">
          <div className="location-map-container">
            <h2 className="h2-lt-heading">Te estamos esperando</h2>
            <h2 className="h2-lt-heading ubi">Ituzaingó</h2>
            <iframe
              title="Grosso Pizza Napoletana"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3282.7658572515597!2d-58.6575249!3d-34.6353568!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95bcbf4843c0ff33%3A0x5f78ac3c8470d157!2sGROSSO%20Pizza%20Napoletana!5e0!3m2!1sen!2sar!4v1697667032097!5m2!1es!2sar"
              className="grosso-map"
              allowfullscreen=""
              loading="lazy"
              referrerpolicy="no-referrer-when-downgrade"
            />
            <Button>
              <a
                href="https://www.google.com/maps/place/GROSSO+Pizza+Napoletana,+Ing.+Quartino+2176,+B1714+Ituzaing%C3%B3,+Provincia+de+Buenos+Aires/@-34.6353568,-58.6575249,17z/data=!4m6!3m5!1s0x95bcbf4843c0ff33:0x5f78ac3c8470d157!8m2!3d-34.6353568!4d-58.6575249!16s%2Fg%2F11stnfx_6k"
                style={{ color: "#fff" }}
              >
                Ver Dirección
              </a>
            </Button>
            <div className="visitanos-open">
              <div className="visitanos">
                <h3 className="h3-lt-heading">Visitanos en:</h3>
                <p className="_1-3-rem-paragraph centered">
                  Ing. Quartino 2176 <br />
                  B1714 Ituzaingó <br />
                  Provincia de Buenos Aires, <br />
                  Argentina
                </p>
              </div>
              <div className="we-are-open">
                <h3 className="h3-lt-heading">Nuestros horarios:</h3>
                <div className="open-hours-block">
                  <div className="open-hours">
                    <div className="text-block-5">Lunes - Jueves</div>
                    <div className="_1-3-rem-paragraph">10 a.m. - 10 p.m.</div>
                    <div className="text-block-5">Viernes - Sábado</div>
                    <div className="_1-3-rem-paragraph">10 a.m. - 11 p.m.</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Location;
