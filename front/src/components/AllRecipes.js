import React, { useEffect, useState } from 'react'
import { Link } from "react-router-dom";
import axios from 'axios';

import unlike from '../img/unlike.svg'
import liked from '../img/liked.png'
import hearted from '../img/hearted.png'
import unhearted from '../img/unhearted.svg'

const  AllRecipes = (props) => {
 
   
    
    // store user's id from decoded token
    const [userId, setUserId] = useState({})

    //Stock response from back
    const [response, setResponse] = useState();

    // amount of likes of recipe
    const [totalLikes, setTotalLikes] = useState([])
    // recipes liked by the user
    const [recipeLiked, setrecipeLiked] = useState([])
    // recipes favorited by the user
    const [recipeFavorited, setRecipeFavorited] = useState([])
    
    useEffect(() => {
        const getUserId = () => {
            // 1.retrieve the token from localStorage
            const tokenFromStorage = localStorage.getItem('token');
            if(tokenFromStorage) {            
                // 2. retrieve the payload's token
                const base64Payload = tokenFromStorage.split('.')[1]
                // 3. decoded payload's token and parse it so that we can get the user id 
                setUserId(JSON.parse(window.atob(base64Payload)).id)
            } else {
                return 'not token to parse'
            }
        }
         getUserId()
        
        const getAmountOfLikes = async () => {
            const recipeId = props.id;
            const url = `http://localhost:4000/user/countLikes/${recipeId}`;
            const result = await axios.get(url);
            setTotalLikes(result.data);
        }
        getAmountOfLikes()
        
        const getRecipeLiked = async () => {
            const url = `http://localhost:4000/user/recipeLiked/${userId}`
            const result = await axios.get(url)
            setrecipeLiked(result.data)
            console.log(result.data);
        }
        if(userId) getRecipeLiked()

        const getRecipeFavorited = async () => {
            const url = `http://localhost:4000/user/recipeFavorited/${userId}`
            const result = await axios.get(url)
            setRecipeFavorited(result.data)
            console.log('favorited recipes',result.data);
        }
        if(userId) getRecipeFavorited()


     
    }, [response, userId])

    // Check if recipes are liked by the user
    const likedRecipes = recipeLiked.find( ({recipe_id}) => recipe_id == props.id)
    // Check if recipes are favorited by the user
    const favoritededRecipes = recipeFavorited.find( ({recipe_id}) => recipe_id == props.id)  

    // send the recipe favorited to the DB
    const handlePostFavorite = (recipeID) => {
        const alreadyFavorited = recipeFavorited.find( ({recipe_id}) => recipe_id == recipeID)
        if (alreadyFavorited){
            //unfavorite the recipe
            const url = `http://localhost:4000/user/deleteFavorite/${userId}/${recipeID}`
            axios.delete(url)
            .then(res => setResponse(res))
        } else {
            //favorited the recipe
            const url = 'http://localhost:4000/user/addFavorite';
            axios.post(url, {userId: userId, recipeID: recipeID})
            .then(res => setResponse(res));
        }  
    }

    // send the recipe liked to the DB
    const handlePostLike = (recipeID) => {
        console.log(recipeID);
        //Check if recipe is already liked
        const alreadyLiked = recipeLiked.find( ({recipe_id}) => recipe_id == recipeID)
        if (alreadyLiked){
            //unliked
            const url = `http://localhost:4000/user/deleteLike/${userId}/${recipeID}`
            axios.delete(url)
            .then(res => setResponse(res))
        } else {
            //liked
            const url = 'http://localhost:4000/user/addLike';
            axios.post(url, {userId: userId, recipeID: recipeID})
            .then(res => setResponse(res));
        }

    }
    
    
    return (

        <div class="recipes-list">
            <div key={props.id}class="recipes-list__items">
                <div class="recipes-list__image-box">
                    <Link to={`/recipe/${props.id}`}>
                    <img class="recipes-list__image" src={props.photo}/></Link>
                </div>
                <div class="recipes-list__content-box">
                    <div class="recipe-info">
                        <aside class="recipe-info__category_name">{props.name}</aside>
                        <aside class="recipe-info__date">{props.created_at
                        }</aside>
                    </div>
                    <Link to={`/recipe/${props.id}`}><h3 class="heading-tertiary heading-tertiary--small">{props.title}</h3></Link>
                    <p class="recipe-intro">{props.introduction}</p>
                    <div class="repice-icons-box">
                        <img 
                            class="repice-icons repice-icons--like" 
                            onClick={()=> handlePostLike(props.id)} 
                            src={likedRecipes ? liked : unlike}
                        />
                        <img 
                            class="repice-icons" 
                            onClick={()=> handlePostFavorite(props.id)} 
                            src={favoritededRecipes ? hearted : unhearted }/>
                            
                        {totalLikes.map(totalLike =>
                        <span  class="like">{totalLike.total} likes</span>)}
                    </div>
                </div>
            </div>
        </div>
       

    )
}

export default AllRecipes