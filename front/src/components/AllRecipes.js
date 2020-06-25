import React from 'react'
import { Link } from "react-router-dom";
import axios from 'axios';
import heart from '../img/heart.svg'
import like from '../img/like.svg'


const  AllRecipes = (props) => {
    
    
    const handlePost = (recipeID) => {
        const url = 'http://localhost:4000/user/addFavorite';
        axios.post(url, {recipeID: recipeID})  
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
                        <img class="repice-icons repice-icons--like" src={like}/>
                        <img class="repice-icons" onClick={()=> handlePost(props.id)} src={heart}/>
                        <span class="like">likes</span>
                    </div>
                </div>
            </div>
         
            
        </div>
       

    )
}

export default AllRecipes