import React from 'react'

export default function AllRecipes(props) {
    return (
        <div class="recipes-list__items">
            <div class="recipes-list__image-box">
                <img class="recipes-list__image" src={props.photo}/>
            </div>
            <div class="recipes-list__content-box">
                <aside class="category_name">{props.name}</aside>
                <aside class="recipes-list__content-box__date">{props.created_at}</aside>
                <h2 class="heading-secondary heading-secondary--big">{props.title}</h2>
                <p>{props.introduction}</p>
            </div>
            
        </div>
    )
}
