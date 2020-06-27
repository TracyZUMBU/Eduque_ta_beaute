import React from 'react'
import {Link} from 'react-router-dom'
import Navigation from './Navigation'

import logoETB from '../img/logo_ETB.png'


const Header = () => {
    return (
        <header class="header">
            <div class="bannerHeader">
                <Link to="/home"><div class="logo-box">
                    
                    <p class="logo-texte">Eduque Ta Beaute</p>
                </div></Link>
            </div>
            <Navigation/>
        </header>
    )
}

export default Header
