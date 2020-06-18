import React, {useState, useEffect } from 'react'
import axios from 'axios'
import Header from '../../components/Header'
import Banner from '../../components/BannerCategory'
import AllRecipes from '../../components/AllRecipes'

export default function RecipesPage() {

      // Retrieve all recipes
      const [allRecipes, setAllRecipes] = useState([])
      // 
      const bannerName = "recettes"

      useEffect(() => {
        const getAllRecipes = async () => {
            const url = 'http://localhost:8000/user/allrecipes/'
            const result = await axios.get(url)
            setAllRecipes(result.data);
            console.log('tt', allRecipes, result.data); // tableau vide dans la console ?
        }
        getAllRecipes();

      }, [])

    return (
        <div>
            <Header/>
            <Banner bannerName={bannerName} />
            <div class="main">
                <div class="recipes-list">
                    {allRecipes.map(allRecipe => (
                        <AllRecipes
                            key={allRecipe.id}
                            title={allRecipe.title}
                            created_at={allRecipe.created_at}
                            introduction={allRecipe.introduction}
                            photo={allRecipe.photo}
                            name={allRecipe.name}/>
                    ))}
                </div>
            </div>
         
        </div>
    )
}
