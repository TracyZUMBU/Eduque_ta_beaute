import React from 'react'
import {Link} from 'react-router-dom'

export default function home() {
    return ( 
        <div class="grid-container">
            <section class="banner"></section>
            <nav class="nav">

                <ul class="nav__list">
                    <Link to="/categories"><li class="nav__item">Recettes</li></Link>
                    <li class="nav__item">Alternatives</li>
                    <li class="nav__item">Mode</li>
                    <li class="nav__item">Blog</li>
                    <Link to="/connexion"><li>Se connecter</li></Link>
                </ul>
            </nav>

            <section class="center">
                <div class="center__img-box">
                    <img src={''} class="center__img" ></img>
                </div>
            </section>
            
            <section class="slide">

            </section>

        </div>
    )
}
