import React from 'react'
import recipe from '../img/lotion.jpg'

export default function Slider(props) {
    return (
        <div class="slider__items">
            <img class="slider__items-image" src={props.photo}></img>
            <aside class="category_name">{props.name}</aside>
            <h2 class="heading-secondary heading-secondary--small">{props.title}</h2>
        </div>      
    )
}
