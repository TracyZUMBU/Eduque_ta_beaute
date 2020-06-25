import React, {useState, useEffect} from 'react'

import DisplayModale from '../DisplayModale'
import axios from 'axios'
import CreateRecipe from './CreateRecipe'


const SectionRecipes = () => {

    // lastest added recipes
    const [recipes, setRecipes] = useState ([])

    const [toggleModale, setToggleModale] = useState (false)
    const [recipeID, setrecipeID] = useState ("")

    // Retrieve the lastest recipes
    useEffect(() => {
        
        const getRecipes = async () => {
            const url = 'http://localhost:4000/user/allRecipes/'
            const result = await axios.get(url)
            setRecipes(result.data)
        }
        getRecipes()
    }, [])

    // open the modal
    const openModale = (id) => {
        setToggleModale(true)
        console.log(toggleModale);
         setrecipeID(id)
        console.log(id);
    }

    //close the modal
    const closeModale = () => {
        const url = `http://localhost:4000/admin/recipeDelete/${recipeID}`
        axios.delete(url)
        window.location.reload()
    }
    

    return (
        <div>
            <h1>Les recettes</h1>
            {recipes.map(recipe => (
                <div key={recipe.id}>
                    <p>{recipe.title}</p>
                    <img src= {recipe.photo} alt="image of recipe"/>
                     <i onClick={()=> openModale(recipe.id)}>x</i></div>
            ))}
            {toggleModale ? <DisplayModale closeFunc={closeModale}/> : ""}
            <div class="create-recipe">
                <CreateRecipe/>
            </div>
        </div>
    )
}
export default SectionRecipes