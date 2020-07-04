import React, { useEffect, useState } from 'react'
import {Link} from 'react-router-dom'
import Navigation from './Navigation'
import axios from 'axios'

import user_icon from '../img/user_icon.png'


const Header = (props) => {

    const [isLoggedIn, setIsLogged] = useState(false)
    const [userID, setUserID] = useState()
    const token = localStorage.getItem('token')

    useEffect (() => {
        if (token) {
            setIsLogged(true);
            //console.log('connected', isLoggedIn);
            
        }else {
            setIsLogged(false);
            //console.log('disconnected');
        }

        const getUserId = async () => {
            const url = 'http://localhost:4000/register/home/'
            const result = await axios({
                method:'GET',
                url:url,
                headers: {
                    'Content-Type':'application/json',
                    'x-access-token': token
                } 
            })
            setUserID(result.data.data.id);
        }
        getUserId()
    },[token])

    const disconnect = () => {
        localStorage.removeItem('token')
        setIsLogged(false)
        alert("vous êtes déconnecté")
    }

    return (
        
        <header class="header">
            <div class="bannerHeader">
                {isLoggedIn ? 
                <div class="logo_profile-box">
                    <Link to={`/user/${userID}`}> <img class="logo_profile" src={user_icon}/></Link>
                </div> 
                : ''}
                <Link to="/"><div class="logo-box">
                    <p class="logo-texte">Eduque Ta Beaute</p>
                </div></Link>
            </div>
            <Navigation isLoggedIn={isLoggedIn} disconnect={disconnect} />
        </header>
        
    )
}

export default Header
