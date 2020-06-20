import React from 'react'

export default function AllRecipes(props) {
    return (
        <div class="recipes-list__items">
            <div class="recipes-list__image-box">
                <img class="recipes-list__image" src={props.photo}/>
            </div>
            <div class="recipes-list__content-box">
                <div class="recipes-info">
                    <aside class="recipes-info__category_name">{props.name}</aside>
                    <aside class="recipes-info__date">{props.created_at
                    }</aside>
                </div>
                <h2 class="heading-secondary heading-secondary--big">{props.title}</h2>
                <p>{props.introduction}</p>
                <div class="repices-like">
                    
                </div>
            </div>
            
        </div>
    )
}
