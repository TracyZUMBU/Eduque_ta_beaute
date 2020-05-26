import React from 'react'
import {Link} from 'react-router-dom'

export default function HomeAdmin() {
    return (
        <div>
            <p>Espace administarteur</p>
            <Link to={'/admin/recipes'}><div>RECETTES</div></Link>
            
            <div>UTILISATEUR</div>
        </div>
    )
}
