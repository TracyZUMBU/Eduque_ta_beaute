import React from 'react'
import {Link} from 'react-router-dom'

export default function HomeAdmin() {
    return (
        <div>
            <p>Espace administarteur</p>
            <Link to={'/admin/recipes'}><div>RECETTES</div></Link>
            
            <Link to={'/admin/AllUsers'}><div>UTILISATEUR</div></Link>
        </div>
    )
}
