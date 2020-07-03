import React, {useEffect, useState} from 'react'
import axios from 'axios'
import {Link} from 'react-router-dom'

import Header from '../../components/Header'
import Banner from '../../components/BannerCategory'
import Navigation from '../../components/Navigation'


const Profile = (props) => {
    // Retrieve user's details
    const [users, setUser] = useState([])
    const [username, setUsername] = useState()
    //Retrieve the user's favorite recipes
    const [favorite, setFavorite] = useState([])
    //Retrieve the user's id
    const id = props.match.params.id
    console.log(id);
    

    
    
    useEffect(() => {
        const getUser = async () => {
            const token = localStorage.getItem('token')
            const url = `http://localhost:4000/user/user/${id}`;
            const result = await axios({
                method: 'GET',
                url: url,
                headers: {
                    'Content-Type':'application/json',
                    'x-access-token': token
                }
            })
            setUser(result.data)
            setUsername(result.data[0].username)
        }
        getUser();

        const getFavorite = async () => {
            const url = `http://localhost:4000/user/favorite/${id}`
            const result = await axios.get(url)
            setFavorite(result.data)
            
        }
        getFavorite();
    }, [])
    
    //!
    const bannerName = `Bienvenue sur votre espace ${username}`
   
    

    return (
        <div>
            <Header/>
            <Banner bannerName={bannerName}/>
            <div class="profile">
                <div class="user_section">
                    {users.map(user =>
                    <div class="userDetails" key={user.id}>
                        <h2 class="profile__title">Changer mes informations</h2>
                        <form id="login" class="login_form login_form--profile">
                            <p class="login_title"></p>
                            <label for="email">
                                </label>
                                <input class="input_login" id="email" type="email" name="email" placeholder="Entrez votre nouveau email" onChange={''}/>
                            
                            <label for="password">
                                </label>
                                <input class="input_login" id="password" type="password" name="password" onChange={''} placeholder="Changer de mot de passe"/>
                            
                                <input  class="submit_login" type="button" value="SE CONNECTER" onClick={''} />
                        </form>
                    </div>
                    )}
                </div>
                <div class="favorite_section">
                    <h2 class="profile__title">Mes recettes favorites</h2>
                    <div class="favorite_list">
                        {favorite.map(el => 
                        <Link to={`/recipe/${el.recipeID}`}> 
                        <div class="favorite_card" key={el.id}>
                            <p class="favorite_card__category">{el.category}</p>
                            <img class="favorite_card__image" src={el.photo}/>
                            <p class="favorite_card__subcat">{el.subcat}</p>
                            <p class="favorite_card__title">{el.title}</p>
                        </div>
                        </Link>
                        )}
                    </div>
                </div>
            </div> 
        </div>
    )
}

export default Profile
