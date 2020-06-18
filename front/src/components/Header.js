import React from 'react'
import {Link} from 'react-router-dom'

export default function Header() {
    return (
        <header class="header">
            <div class="banner"></div>
            <nav class="navigation">
                <ul class="navigation__list">
                    <Link to="/recipes-page"><li class="navigation__item">Recettes</li></Link>
                    <li class="navigation__item">Alternatives</li>
                    <li class="navigation__item">Mode</li>
                    <li class="navigation__item">Blog</li>
                    <Link to="/connexion"><li>Se connecter</li></Link>
                </ul>
            </nav>
        </header>
    )
}
