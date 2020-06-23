import React from 'react'
import {Link} from 'react-router-dom'

const HomeAdmin = () => {
    return (
        <div>
            <p>Espace administarteur</p>
            <Link to={'/admin/recipes'}><div>RECETTES</div></Link>
            
            <Link to={'/admin/AllUsers'}><div>UTILISATEUR</div></Link>
        </div>
    )
}

export default HomeAdmin