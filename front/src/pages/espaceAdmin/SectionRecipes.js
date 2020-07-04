import React, {useState, useEffect} from 'react'
import axios from 'axios'

import DisplayModale from '../DisplayModale'
import CreateRecipe from './CreateRecipe'
import Header from '../../components/Header'
import Banner from '../../components/BannerCategory'

const SectionRecipes = () => {

    // lastest added recipes
    const [recipes, setRecipes] = useState ([])
    const [toggleModal, setToggleModal] = useState (false)
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

    // open the modal - asking for confirmation
    const openModale = (id) => {
        setToggleModal(true)
        setrecipeID(id)
    }

    // delete recipe from recipes table
    const deleteRecipe = () => {
        const url = `http://localhost:4000/admin/recipeDelete/${recipeID}`
        axios.delete(url)
        setToggleModal(false)
    }
    
      // cancel deletion
    const closeModal = () => {
        setToggleModal(false)
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
            {toggleModal ? <DisplayModale deletion={deleteRecipe} closeModal={closeModal} text={'cette recette'}/> : ""}
            <div class="create_recipe">
                <CreateRecipe/>
            </div>
        </>
    )
}
export default SectionRecipes