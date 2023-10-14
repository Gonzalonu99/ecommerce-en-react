
import "./contactForm.css"

function ContactForm() {
    return (
      <div className="container">
        <div className="text">Contactate con nosotros</div>
        <form action="#">
          <div className="form-row">
            <div className="input-data">
              <input type="text" required />
              <div className="underline"></div>
              <label htmlFor="">Nombre</label>
            </div>
            <div className="input-data">
              <input type="text" required />
              <div className="underline"></div>
              <label htmlFor="">Apellido</label>
            </div>
          </div>
          <div className="form-row">
            <div className="input-data">
              <input type="text" required />
              <div className="underline"></div>
              <label htmlFor="">Correo Electronico</label>
            </div>
            <div className="input-data">
              <input type="text" required />
              <div className="underline"></div>
              <label htmlFor="">Asunto</label>
            </div>
          </div>
          <div className="form-row">
            <div className="input-data textarea">
              <textarea rows="8" cols="80" required></textarea>
              <br />
              <div className="underline"></div>
              <label htmlFor="">Dejanos tu mensaje</label>
              <br />
            </div>
          </div>
          <div className="btn-container">
          <input type="submit" className="btn-submit"/>
          
          </div>
          
         
        </form>
      </div>
    );
  }
  
  export default ContactForm;