
import {Link} from 'react-router-dom'
import React, { Component } from 'react'
import axios from 'axios'


 class SubCat extends Component {
    
state = {

    subRecipes : [],
   
}


componentDidMount() {
    
    const idInter = this.props.match.params.idInter
    const idCat = this.props.match.params.idCat
    
axios.get(`http://localhost:8000/user/subCat/${idInter}/${idCat}`)
.then(response => response.data)
.then(data => {
    console.log('sub', data);
    
    
    this.setState({subRecipes : data});
    console.log('sub', this.state.subRecipes);
    
})
}

render() {
    return (

        <ul>
            {this.state.subRecipes.map(subRecipe => 
            <Link to={`/recipes/${subRecipe.id}`}>

                <li><div key={subRecipe.id}>{subRecipe.name} </div></li> </Link>)}
           
        </ul>
        //    {this.props.idCat}
      
    )
}
 }

export default SubCat