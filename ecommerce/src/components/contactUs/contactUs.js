import React, { useState } from "react";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  FormControl,
  InputLabel,
  Input,
  FormHelperText,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import "./contactUs.css";
import useAxios from "../../hook/hookAxios";
import ContactForm from "../contactForm/contactForm";
import Divider from "../divider/divider";

const ContactUs = () => {
  const { data } = useAxios(
    "https://a365.com.ar/ecommerce/preguntasFrecuentes"
  );
  const [expanded, setExpanded] = useState("");

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : "");
  };

  return (
    <div className="contact-section">
      <div className="contact-banner">
        <div className="contact-section-padding">
          <div className="space-banner-wrapper">
            <h1 className="ct-h1-heading">Hablanos</h1>
          </div>
        </div>
      </div>
      <div className="faqs-contact">
        <section className="rl_section_faq1">
          <div className="rl-padding-global-4">
            <div className="rl-container-small">
              <div className="rl-padding-section-large-3">
                <div className="rl_faq1_component">
                  <div className="rl_faq1_heading_wrapper">
                    <h2 className="h2-faq1-heading">
                      <span className="bold-contact-text">Explore</span>{" "}
                      nuestras preguntas frecuentes o{" "}
                      <span className="bold-contact-text">contáctenos</span>{" "}
                      llenando el formulario.
                    </h2>
                  </div>
                  <div className="rl_faq1_spacing-block-2" />
                  <div className="rl_faq1_list">
                    {data.map((pregYRes) => (
                      <Accordion
                        sx={{
                          padding: ".5rem",
                          backgroundColor: "transparent",
                        }}
                        key={pregYRes.Id}
                        expanded={expanded === `panel${pregYRes.Id}`}
                        onChange={handleChange(`panel${pregYRes.Id}`)}
                        className="acordion"
                      >
                        <AccordionSummary
                          expandIcon={<ExpandMoreIcon />}
                          aria-controls={`panel${pregYRes.Id}-content`}
                          id={`panel${pregYRes.Id}-header`}
                        >
                          <Typography>{pregYRes.Pregunta}</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                          <Typography>{pregYRes.Respuesta}</Typography>
                        </AccordionDetails>
                      </Accordion>
                    ))}
                  </div>
                </div>
              </div>
              <ContactForm />
            </div>
            
          </div>
        </section>
      </div>
      <Divider />
    </div>
  );
};

export default ContactUs;
