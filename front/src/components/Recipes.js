import React, {useState, useEffect} from 'react'
import axios from 'axios'

import RecipeList from '../pages/Recettes/RecipeList'

export default function Recipes(props) {

    const [recipes, setRecipes] = useState([])
    
    
    useEffect(() => {
        
        const id = props.match.params.id

        const getRecipes = async () => {
            const url = `http://localhost:8000/user/recipes/${id}`  
            const result = await axios.get(url)
            
                setRecipes(result.data)
                console.log('test', result.data);
            }

            
            getRecipes()
        
    },[])

    return (
       
        <div>
          
    
            {recipes.map(recipe => (
            <RecipeList
            key={recipe.id}
            title={recipe.title}
            materiel={recipe.materiel}
            ingredient={recipe.ingredient}/>
              
            ))}

        </div>
    )
}

