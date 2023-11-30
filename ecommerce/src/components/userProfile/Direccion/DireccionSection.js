import React from 'react'
import DireccionCard from './DireccionCard'
import AddDireccion from './AddDireccion'

const DireccionSection = () => {
  return (
    <div style={{marginTop:"1rem", display:"flex", flexWrap:"wrap", gap:"3rem", width:"70rem", minHeight:"32.9rem"}}>
        <AddDireccion/>
        <DireccionCard/>
        <DireccionCard/>
        
    </div>
    
  )
}

export default DireccionSection