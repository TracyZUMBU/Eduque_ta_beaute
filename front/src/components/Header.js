import React, { useEffect, useState } from 'react'
import {Link} from 'react-router-dom'
import Navigation from './Navigation'

import logoETB from '../img/logo_ETB.png'


const Header = () => {

    const [isLoggedIn, setIsLogged] = useState(false)
    //! quand je me connecte il faut rafrachir la page pour que isLoggedIn change
    useEffect (() => {
        if (localStorage.getItem('token')) {
            setIsLogged(true);
            console.log('connected');
            
            
        }else {
            setIsLogged(false);
            console.log('disconnected');
        }
    },[isLoggedIn])

    return (
        
        <header class="header">
            <div class="bannerHeader">
                {isLoggedIn ? 
                <div class="logo_profile-box">
                    <img class="logo_profile"src="https://img.icons8.com/ios-glyphs/60/000000/user-male.png"/>
                </div> 
                : ''}
                <Link to="/home"><div class="logo-box">
                    <p class="logo-texte">Eduque Ta Beaute</p>
                </div></Link>
            </div>
            <Navigation/>
        </header>
        
    )
}

export default Header
