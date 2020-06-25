
import {Link} from 'react-router-dom'
import React, { Component } from 'react'
import axios from 'axios'


class InterCat extends Component {
    
state = {

    interCatRecipes : [],
    idCat : ""
    

}


componentDidMount() {
    
    const id = this.props.match.params.id
    
axios.get(`http://localhost:4000/user/interCat/${id}`)
.then(response => response.data)
.then(data => {
    console.log('blabla', data);
    
    
    this.setState({interCatRecipes : data});
    console.log('bonjour', this.state.interCatRecipes);
    this.setState({idCat : id})
    console.log('ttt',id);
   
    
    
    
    
})
}

render() {
    return (
        <div>
        <ul>
            {this.state.interCatRecipes.map(interCatRecipe => 
            
            <Link to={`/subCat/${interCatRecipe.cat_inter_id}/${this.state.idCat}`}>
                <li><div key={interCatRecipe.cat_inter_id
            
            }>{interCatRecipe.name_cat_inter}</div></li></Link>)}
            
           
        </ul>
        
        
        </div>
       
    )
}
}


export default InterCat