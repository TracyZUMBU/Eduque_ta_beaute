import React, {useState, useEffect } from 'react'
import axios from 'axios'

import Header from '../../components/Header'
import Banner from '../../components/BannerCategory'
import FilterRecipes from '../../components/FilterRecipes'
import mail from '../../img/mail.svg'
import Footer from '../../components/Footer'

const RecipesPage = () => {

    // Retrieve all recipes
    const [allRecipes, setAllRecipes] = useState([])
    // 
    const bannerName = "recettes"

    useEffect(() => {
        // Retrive all the recipes
        const getAllRecipes = async () => {
        const url = 'http://localhost:4000/user/allrecipes/'
        const result = await axios.get(url)
        setAllRecipes(result.data);
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
                    <div class="recipePage-blockRight">
                         <p class="recipePage-blockRight__text"> <span>Des idées ?</span> <span>Des astuces ?</span>  <span>Des recettes ?</span>  Ecolo, Ecocome et Simplissime à faire ? <span>Envoi-les nous.</span> On les publiera sur le site</p>
                         <img  onClick={()=> alert("Patience. Tu pourras bientôt nous partager des pépites :)")} class="logo_mail" src={mail}/>
                    </div>
                </div>
            </main>
         <Footer/>
        </div>
    )
}

export default RecipesPage
