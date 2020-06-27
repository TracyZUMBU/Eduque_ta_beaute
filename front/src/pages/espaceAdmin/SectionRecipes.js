import React, {useState, useEffect} from 'react'
import axios from 'axios'

import DisplayModale from '../DisplayModale'
import CreateRecipe from './CreateRecipe'
import Header from '../../components/Header'
import Banner from '../../components/BannerCategory'

const SectionRecipes = () => {

    // lastest added recipes
    const [recipes, setRecipes] = useState ([])
    const [toggleModale, setToggleModale] = useState (false)
    const [recipeID, setrecipeID] = useState ("")

    const bannerName = "Espace Adminitrateur"
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
        <>
            <Header/>
            <Banner bannerName={bannerName}/>
            <h1>Les recettes</h1>
            <div class="admin_recipe-list-box">
            {recipes.map(recipe => (
                    <div class='admin_recipe-list' key={recipe.id}>
                        <img class="admin_recipe-image" src= {recipe.photo} alt="image of recipe"/>
                        <p class="admin_recipe-title">{recipe.title}</p>
                        <img class="admin_logo-delete" onClick={() => openModale(recipe.id)} src="https://img.icons8.com/color/48/000000/delete-forever.png"/> 
                    </div>  
            ))}
            </div>              
            {toggleModale ? <DisplayModale closeFunc={closeModale}/> : ""}
            <div class="create-recipe">
                <CreateRecipe/>
            </div>
        </>
    )
}
export default SectionRecipes