import React from 'react';
import Tilt from 'react-tilt';
import './logo.css';
import brain from './brain.png'

const Logo = () => {
    return (
        <div  className='ma4 mt0'>
            <Tilt  className="Tilt br2 shadow-2" options={{ max: 25 }} style={{ height: 250, width: 250 }} >
                <div  className="Tilt-inner pt4">
                    <img src={brain} alt='logo' width='100%' height='100%' /> 
                </div>
            </Tilt>
        </div>
    )
}

export default Logo;