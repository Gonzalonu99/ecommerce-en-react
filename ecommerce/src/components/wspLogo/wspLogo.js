import React from 'react'
import wsp from '../../img/wspLogo.webp'
import './wspLogo.css'

const WspLogo = () => {
  return (
    <div className='wsp-Logo-container'>
      <a href='https://web.whatsapp.com/' target='BlANK'><img className='wsp-logo-img' src={wsp} alt='Logo de WhatsApp'/></a>
    </div>
  )
}

export default WspLogo