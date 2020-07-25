import React from 'react'
import {Link, withRouter} from 'react-router-dom'

export default function Navigation({isLoggedIn,disconnect}) {
    const token = localStorage.getItem('token')

    return (
             <nav class="navigation">
                <ul class="navigation__list">
                    <Link to="/recipes-page"><li class="navigation__item">Recettes</li></Link>
                    <Link to="/upcoming/alternatives"><li class="navigation__item">Alternatives</li></Link>
                    <Link to="/upcoming/mode"><li class="navigation__item">Mode</li></Link>
                    <Link to="/upcoming/blog"><li class="navigation__item">Blog</li></Link>
                    {isLoggedIn ? 
                    <li class="navigation__item navigation__item--log" onClick={() => disconnect()}>Se déconnecter</li>
                    :
                    <Link to="/connexion"><li class="navigation__item navigation__item--log">Se connecter</li></Link>
                    }
                </ul>
            </nav>
    )
}
