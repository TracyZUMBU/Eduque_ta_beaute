import React from 'react'
import {Link} from 'react-router-dom'
import { useEffect, useState } from 'react'

export default function Navigation() {

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
    
    console.log(isLoggedIn);
    const disconnect = () => {
        localStorage.removeItem('token')
        setIsLogged(false)
        alert("vous êtes déconnecté")
    }

    return (
             <nav class="navigation">
                <ul class="navigation__list">
                    <Link to="/recipes-page"><li class="navigation__item">Recettes</li></Link>
                    <li class="navigation__item">Alternatives</li>
                    <li class="navigation__item">Mode</li>
                    <li class="navigation__item">Blog</li>
                    {isLoggedIn ? 
                    <li class="navigation__item navigation__item--log" onClick={() => disconnect()}>Se déconnecter</li>
                    :
                    <Link to="/connexion"><li class="navigation__item navigation__item--log">Se connecter</li></Link>
                    }
                </ul>
            </nav>
    )
}
