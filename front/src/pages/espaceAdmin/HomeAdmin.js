import React from 'react'
import {Link} from 'react-router-dom'
import Header from '../../components/Header'
import Banner from '../../components/BannerCategory'

const HomeAdmin = () => {

    const bannerName = "Espace Adminitrateur"
    return (
        <div>
            <Header/>
            <Banner bannerName={bannerName}/>
            
            <Link to={'/admin/recipes'}><div>RECETTES</div></Link>
            
            <Link to={'/admin/AllUsers'}><div>UTILISATEUR</div></Link>
        </div>
    )
}

export default HomeAdmin