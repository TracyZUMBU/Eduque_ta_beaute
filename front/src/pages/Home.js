import React from 'react'
import {Link} from 'react-router-dom'

export default function home() {
    return (
        <div>
            <ul>
            <Link to="/categories"><li>Recette</li></Link>
            <li>Alternative</li>
            <li>Mode</li>
            <li>Blog</li>
            <Link to="/connexion"><li>Se connecter</li></Link>
            </ul>

            <div className="slide"></div>

            <h1>Dernièrement</h1>

            <div></div>
        </div>
    )
}
