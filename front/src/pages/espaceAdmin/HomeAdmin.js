import React, { useEffect, useState } from 'react'
import {Link} from 'react-router-dom'
import Header from '../../components/Header'
import Banner from '../../components/BannerCategory'
import axios from 'axios'


const HomeAdmin = () => {

    const [idUser, setIduser] = useState('')
    useEffect(() => {
        const getHome = async () => {
            const token = localStorage.getItem('token')
            const url = 'http://localhost:4000/register/home/'
            const result = await axios({
                method:'GET',
                url:url,
                headers: {
                    'Content-Type':'application/json',
                    'x-access-token': token
                }               
            })
            setIduser(result.data.data.id);
        }
        getHome()    
    }, [])

    return (
        <>
            <Header idUser={idUser}/>
            <Banner bannerName={"Espace Administrateur"}/>
            <Link to={'/admin/recipes'}><div>RECETTES</div></Link>           
            <Link to={'/admin/AllUsers'}><div>UTILISATEUR</div></Link>
        </>
    )
}

export default HomeAdmin