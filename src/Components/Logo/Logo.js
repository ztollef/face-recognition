import React from "react";
import Tilt from 'react-tilt'
import './Logo.css'
import brain from './icons8-brain-80.png'


const Logo = () => {
    return(
       <div className='ma4 mt0'>
            <Tilt className="Tilt br2 shadow-2 center" options={{ max : 55 }} style={{ height: 100, width: 100 }} >
            <div className="Tilt-inner"><img style={{paddingTop: '10px'}}src={brain} alt='brain'/> </div>
            </Tilt>
       </div>
    )
}

export default Logo;