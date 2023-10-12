import React from 'react'
import fb from "../../img/facebookLogo.webp";
import instagram from "../../img/instagramLogo.webp";
import "./redes.css"
const Redes = () => {
  return (
    <div className='redes-container'>
        <div className='redes-header'>
            <h4><span>Seguinos</span> en nuestras redes para mantenerte actualizado</h4>
        </div>
        <div className='redes-social'>
            <a>
                <img className='redes-img-social' src={fb} alt='iMAGEN FACEBOOK'/>
            </a>
            <a>
                <img className='redes-img-social' src={instagram} alt='INSTAGRAM'/>
            </a>
        </div>
    </div>
  )
}

export default Redes