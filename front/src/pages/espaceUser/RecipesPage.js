import React, {useState, useEffect } from 'react'
import axios from 'axios'

import Header from '../../components/Header'
import Banner from '../../components/BannerCategory'
import FilterRecipes from '../../components/FilterRecipes'

const RecipesPage = () => {

    // Retrieve all recipes
    const [allRecipes, setAllRecipes] = useState([])
    // 
    const bannerName = "recettes"

    useEffect(() => {
        // Retrive all the recipes
        const getAllRecipes = async () => {
        const url = 'http://localhost:8000/user/allrecipes/'
        const result = await axios.get(url)
        setAllRecipes(result.data);
        console.log('tt', allRecipes, result.data); // tableau vide dans la console ?
    }
    getAllRecipes();
    },[])

    return (
        <div>
            <Header/>
            <Banner bannerName={bannerName} />
            <main class="main main--recipesPage">
                <div class="recipes-container">
                    <FilterRecipes/> 
                </div>
                <aside class="aside__recipes"> Des idées ? Des astuces ? Des recettes ?  Ecolo, Ecocome et Simplissime à faire ? Envoi-les nous. On les publiera sur le site</aside>
            </main>
         
        </div>
    )
}

export default RecipesPage
