import React, {useEffect, useState} from 'react'
import axios from 'axios'
import Header from '../../components/Header'
import Banner_category from '../../components/BannerCategory'
import Navigation from '../../components/Navigation'


const Profile = (props) => {
    // Retrieve user's details
    const [users, setUser] = useState([])
    //Retrieve the user's favorite recipes
    const [favorite, setFavorite] = useState([])
    //Retrieve the user's id
    const id = props.match.params.id
    

    useEffect(() => {
        const getUser = async () => {
            const url = `http://localhost:8000/user/user/${id}`;
            const result = await axios.get(url)
            setUser(result.data)
        }
        getUser();

        const getFavorite = async () => {
            const url = `http://localhost:8000/user/favorite/${id}`
            const result = await axios.get(url)
            setFavorite(result.data)

        }
        getFavorite();
    }, [])

    return (
        <div>
            <Header/>
            <div class="profileSection">
                <p>bienvenue sur votre profile</p>
                {users.map(user =>
                <div class="userDetails" key={user.id}>
                    <p class="userDetails__name">{user.username}</p>
                    <p class="userDetails__email">{user.email}</p>
                </div>
                )}

                <p>Mes recettes favorites</p>
                {favorite.map(el => 
                <div class="favoriteList" key={el.id}>
                    <p>{el.title}</p>
                    <img src={el.photo}/>
                </div>
                )}
            </div>
        </div> 
    )
}

export default Profile
