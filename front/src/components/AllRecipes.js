import React, { useEffect, useState } from 'react'
import { Link } from "react-router-dom";
import axios from 'axios';
import heart from '../img/heart.svg'
import like from '../img/like.svg'
import ReactHtmlParser from 'react-html-parser';


const  AllRecipes = (props) => {
    
    
    const [decodedToken, setDecodedToken] = useState({})
    // store user's id from decoded token
    const userId = decodedToken.id
    // amount of likes of recipe
    const [totalLikes, setTotalLikes] = useState([])
    
    useEffect(() => {

        const getUserId = () => {
            // 1.retrieve the token from localStorage
            const tokenFromStorage = localStorage.getItem('token');
            if(tokenFromStorage) {            
                // 2. retrieve the payload's token
                const base64Payload = tokenFromStorage.split('.')[1]
                // 3. decoded payload's token and parse it so that we can get the user id
                 setDecodedToken(JSON.parse(window.atob(base64Payload)))              
            } else {
                return 'not token to parse'
            }
        }
        getUserId()


        const getRecipeId = async () => {
            const recipeId = props.id;
            const url = `http://localhost:4000/user/countLikes/${recipeId}`;
            const result = await axios.get(url);
            setTotalLikes(result.data);
            console.log(result.data);
        }
        getRecipeId();

    }, [])
    
   
    
    // send the recipe favorited to the DB
    const handlePostFavorite = (recipeID) => {
        const url = 'http://localhost:4000/user/addFavorite';
        axios.post(url, {userId: userId, recipeID: recipeID})
    }

    const handlePostLike = (recipeID) => {
        const url = 'http://localhost:4000/user/addLike';
        axios.post(url, {userId: userId, recipeID: recipeID})
        console.log('handlepostlike');
        
    }

    return (


        <div class="recipes-list">
            <div class="recipes-list__items">
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
                        <img class="repice-icons repice-icons--like" onClick={()=> handlePostLike(props.id)}src={like}/>
                        <img class="repice-icons" onClick={()=> handlePostFavorite(props.id)} src={heart}/>
                        {totalLikes.map(totalLike =>
                        <span  class="like">{totalLike.total} likes</span>)}
                        {/*{ReactHtmlParser(props.tiny)}*/}
    
                    </div>
                </div>
            </div>
         
            
        </div>
       

    )
}

export default AllRecipes