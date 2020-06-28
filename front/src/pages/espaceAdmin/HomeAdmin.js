import React, { useEffect, useState } from 'react'
import {Link} from 'react-router-dom'
import Header from '../../components/Header'
import Banner from '../../components/BannerCategory'
import axios from 'axios'


const HomeAdmin = () => {

    const [iduser, setIduser] = useState('')
    console.log("home")
    useEffect(() => {
        const getHome = async () => {
            const token = localStorage.getItem('token')
            console.log("token", token)
            const url = 'http://localhost:4000/register/home/'
            const result = await axios({
                method:'GET',
                url:url,
                headers: {
                    'Content-Type':'application/json',
                    'x-access-token': token
                }
                
            })
            console.log("result.data",result.data.data.id)
            setIduser(result.data.data.id);
        }
        getHome()
        
    }, [])

    const bannerName = "Espace Adminitrateur"
    return (
        <>
            <Header/>
            <Banner bannerName={bannerName}/>
            
            <Link to={'/admin/recipes'}><div>RECETTES</div></Link>
            
            <Link to={'/admin/AllUsers'}><div>UTILISATEUR</div></Link>
        </>
    )
}

export default HomeAdmin