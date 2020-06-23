import React from 'react'
import { Link } from "react-router-dom";
import axios from 'axios';


const  AllRecipes = (props) => {
    
    
    const handlePost = (recipeID) => {
        const url = 'http://localhost:8000/user/addFavorite';
        axios.post(url, {recipeID: recipeID})  
    }

    return (
        <div class="recipes-list__items">
            <div class="recipes-list__image-box">
                <Link to={`/recipe/${props.id}`}>
                <img class="recipes-list__image" src={props.photo}/></Link>
            </div>
            <div class="recipes-list__content-box">
                <div class="recipes-info">
                    <aside class="recipes-info__category_name">{props.name}</aside>
                    <aside class="recipes-info__date">{props.created_at
                    }</aside>
                </div>
                <Link to={`/recipe/${props.id}`}><h2 class="heading-secondary heading-secondary--big">{props.title}</h2></Link>
                <p>{props.introduction}</p>
                <div class="repices-icons">
                    <img src="https://img.icons8.com/pastel-glyph/64/000000/facebook-like.png"/>
                    <img onClick={()=> handlePost(props.id)} src="https://img.icons8.com/dotty/80/000000/wish-list.png"/>
                </div>
            </div>
            
        </div>
    )
}

export default AllRecipes