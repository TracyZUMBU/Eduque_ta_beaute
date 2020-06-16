import React from 'react'
import {Link} from 'react-router-dom'
import '../css/style.css';
import photo from '../img/flacon_white.jpg'
export default function home() {
    return ( 
        <div class="grid-container">

            <section class="header">
                <p>jjj</p>
            </section>

            <nav class="navigation">

                <ul class="navigation__list">
                    <Link to="/categories"><li class="navigation__item">Recettes</li></Link>
                    <li class="navigation__item">Alternatives</li>
                    <li class="navigation__item">Mode</li>
                    <li class="navigation__item">Blog</li>
                    <Link to="/connexion"><li>Se connecter</li></Link>
                </ul>
            </nav>

            <main class="main main--home">

                <section class="center">
                    <div class="center__img-box">
                        <img src={photo} class="center__img" ></img>
                    </div>
                </section>
                
                <section class="slide">
                    <div class="slide__box">
                        <h1>Features news</h1>

                        <div class="slide__list">
                            <div class="slide__items">
                                <img src={''}></img>
                                <h2>nom de la catégorie de nav</h2>
                                <h3>sous titre</h3>
                            </div>
                        </div>
                    </div>
                </section>


            </main>
      

        </div>
    )
}
