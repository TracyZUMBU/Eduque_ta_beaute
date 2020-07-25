import React from 'react'
import {Link} from 'react-router-dom'

const Slider = (props) => {
    return (
        <div class="slider__items">
            <figure>
                <Link to={`/recipe/${props.id}`}><img class="slider__items-image" src={props.photo}/></Link>
            </figure>
            <div class="aside-box">
                <aside class="category_name">{props.name}</aside>
            </div>
            <Link to={`/recipe/${props.id}`}><h4 class="heading-">{props.title}</h4></Link>
        </div>      
    )
}

export default Slider
