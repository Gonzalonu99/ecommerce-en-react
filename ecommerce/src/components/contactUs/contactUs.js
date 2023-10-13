import React, { useState } from "react";
import "./contactUs.css";
import useAxios from "../../hook/hookAxios";

const ContactUs = () => {
  const { data } = useAxios(
    "https://a365.com.ar/ecommerce/preguntasFrecuentes"
  );
  const [openAnswers, setOpenAnswers] = useState({});
  const toggleAnswer = (id) => {
    setOpenAnswers((prevState) => ({
      ...prevState,
      [id]: !prevState[id],
    }));
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
                      nuestras preguntas frecuentes o contáctenos llenando el
                      formulario.
                    </h2>
                  </div>
                  <div className="rl_faq1_spacing-block-2" />
                  <div className="rl_faq1_list">
                    {data.map((pregYRes) => (
                      <div className="rl_faq1_acordion" key={pregYRes.Id}>
                        <div className="rl_faq1_question">
                          <div className="rl_faq1_question_text">
                            {pregYRes.Pregunta}
                          </div>
                          <div
                            className="rl_faq1_icon-wrapper"
                            onClick={() => toggleAnswer(pregYRes.Id)}
                          >
                            <div className="rl_faq1_icon w-embed">
                              <button className="rl_faq1_btn">
                                <svg
                                  width=" 100%"
                                  height=" 100%"
                                  viewBox="0 0 32 32"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path
                                    fill-rule="evenodd"
                                    clip-rule="evenodd"
                                    d="M16.5303 20.884C16.2374 21.1769 15.7625 21.1769 15.4696 20.884L7.82315 13.2375C7.53025 12.9446 7.53025 12.4698 7.82315 12.1769L8.1767 11.8233C8.46959 11.5304 8.94447 11.5304 9.23736 11.8233L15.9999 18.5859L22.7625 11.8233C23.0554 11.5304 23.5303 11.5304 23.8231 11.8233L24.1767 12.1769C24.4696 12.4698 24.4696 12.9446 24.1767 13.2375L16.5303 20.884Z"
                                    fill="currentColor"
                                  ></path>
                                </svg>
                              </button>
                            </div>
                          </div>
                        </div>
                        <div
                          className={`rl_faq1_answer ${
                            openAnswers[pregYRes.Id] ? "open" : ""
                          }`}
                        >
                          <div className="rl_faq1_answer-wrapper">
                            <p className="rl-answer-text">
                              {pregYRes.Respuesta}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="rl_faq1_cta-wrapper" />
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default ContactUs;
