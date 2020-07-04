import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import axios from 'axios'

export default class categories extends Component {
    
    state = {

        catRecipes : []

    }
    
    componentDidMount() {
        axios.get('http://localhost:4000/user/catRecipes')
        .then(response => response.data)
        .then(data => {
            this.setState({catRecipes : data});
        })
    }

    render() {
        return (

            <ul>
                {this.state.catRecipes.map(catRecipe => 
                <Link to={`/interCat/${catRecipe.id}`}>
                <li><div key={catRecipe.id}>{catRecipe.name}</div></li>
                </Link>)}
            </ul>
           
        )
    }
}

