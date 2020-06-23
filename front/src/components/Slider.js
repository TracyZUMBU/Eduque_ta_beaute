import React from 'react'
import {Link} from 'react-router-dom'

const Slider = (props) => {
    return (
        <div class="slider__items">
            <Link to={`/recipe/${props.id}`}><img class="slider__items-image" src={props.photo}/></Link>
            <aside class="category_name">{props.name}</aside>
            <Link to={`/recipe/${props.id}`}><h2 class="heading-secondary heading-secondary--small">{props.title}</h2></Link>
        </div>      
    )
}

export default Slider
