import React, {useEffect, useState, useRef} from 'react'
import axios from 'axios'
import {Link} from 'react-router-dom'

import Header from '../../components/Header'
import Banner from '../../components/BannerCategory'
import Navigation from '../../components/Navigation'
import DisplayModale from '../DisplayModale'



const Profile = (props) => {
    
    //Retrieve the user's id
    const id = props.match.params.id;
    // Retrieve user's details
    const [users, setUser] = useState([])
    //stock username
    const [username, setUsername] = useState([])
    //Retrieve the user's favorite recipes
    const [favorite, setFavorite] = useState([])
    //Stock response from back
    const [response, setResponse] = useState();

    /**
     * Variable for update function
     */
    // stock new user's email
    const [newEmail, setNewEmail] = useState()
    // stock new user's password
    const [newPassword, setNewPassword] = useState()
    // stock repeat user's password
    const [repeatPassword, setRepeatPassword] = useState()
    // stock all new user's details
    const newUserDetails = {newEmail, newPassword, repeatPassword, id}
    let form = useRef();

    /**
     * Handle suppression recipe from favorite list
     */
    // retrieve the recipe's deleted id 
    const [recipeID, setRecipeID] = useState()
    const userID = {id}
    // Manage displaying of modale
    const [toggleModal, setToggleModal] = useState (false) 

    useEffect(() => {
        // retrieve all user's details
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
            setUser(result.data);
            setUsername(result.data[0].username)
        }
        getUser();

        // retrieve user's favorite recipes
        const getFavorite = async () => {
            const url = `http://localhost:4000/user/favorite/${id}`
            const result = await axios.get(url)
            setFavorite(result.data)
        }
        getFavorite();
    }, [response])

    // send new user's details to the DB
    const handleUpdateDetailsUSer = () => {
        const url = 'http://localhost:4000/user/updateDetails/'
        console.log(newUserDetails);
        axios.put(url, newUserDetails)
        form.current.reset();
    }

    // open the modal
    const openModale = (recipeID) => {
        setToggleModal(true)
        setRecipeID(recipeID)

    }

    // cancel deletion
    const closeModal = () => {
        setToggleModal(false)
    }

    // delete recipe from farovite list
    const deleteRecipe = () => {
        const url = `http://localhost:4000/user/delete_recipe/${recipeID}`
        axios.delete(url, {data :{userID: id} })
        .then(res => setResponse(res))
        setToggleModal(false)
    }

    // Display the user's name on the banner
    const bannerName = `Bienvenue sur votre espace ${username}`

    return (
        <div class='container'>
            <Header/>
            <Banner bannerName={bannerName}/>
            <div class="profile">
                <div class="user_section">
                    {users.map(user =>
                    <div class="userDetails" key={user.id}>
                        <h2 class="profile__title">Changer mes informations</h2>
                        <form id="login" class="login_form login_form--profile"
                        ref={form}>
                            <p class="login_title"></p>
                                <input 
                                    class="input_login" 
                                    id="email" type="email" 
                                    name="email" 
                                    placeholder="Entrez votre nouveau email" onChange={(e) => setNewEmail(e.target.value)}/>
                                <input 
                                    class="input_login" 
                                    id="password" 
                                    type="password" 
                                    name="password" 
                                    placeholder="Changer de mot de passe"
                                    onChange={(e) => setNewPassword(e.target.value)}/>
                                <input 
                                    class="input_login" 
                                    id="password" 
                                    type="password" 
                                    placeholder="Répéter le de mot de passe"
                                    name="password" 
                                    onChange={(e) => setRepeatPassword(e.target.value)}/>

                            
                                <input  class="submit_login" type="button" value="Changer mes informations" onClick={handleUpdateDetailsUSer} />
                        </form>
                    </div>
                    )}
                </div>
                <div class="favorite_section">
                    <h2 class="profile__title">Mes recettes favorites</h2>
                    <div class="favorite_list">
                        {favorite.map(el => 
                        <div class="favorite_card" key={el.id}>
                        <Link to={`/recipe/${el.recipeID}`}> 
                            <p class="favorite_card__category">{el.category}</p>
                            <img class="favorite_card__image" src={el.photo}/>
                            <p class="favorite_card__subcat">{el.subcat}</p>
                            <p class="favorite_card__title">{el.title}</p>
                        </Link>
                        <div class="delete_recipes" onClick={() => openModale(el.recipeID)}>&#x274C;</div>
                        </div>
                        )}
                    </div>
                </div>
            </div> 
            {toggleModal ? <DisplayModale deletion={deleteRecipe} closeModal={closeModal} text={'cette recette'}/> : ""}
        </div>
    )
}

export default Profile
