import React, {useEffect, useState} from 'react'
import axios from 'axios'
import '../css/style.css';

import Header from '../components/Header'
import Slider from '../components/Slider'
import mainSlide from '../img/main_slide.jpeg'

const Home = () => {

    const [lastestRecipes, setLatestRecipes] = useState ([])
    
    useEffect(() => {
        

        const getLatestRecipes = async () => {
            const url = 'http://localhost:8000/admin/lastestRecipes/'
            const result = await axios.get(url)
            setLatestRecipes(result.data)
            console.log(lastestRecipes);
            }
            getLatestRecipes();
    }, [])

    return ( 
        <div class="grid-container">
            <Header/>

            <main class="main main--home">
                <section class="center">
                    <div class="center__image-box">
                        <img src={mainSlide} class="center__image"></img>
                    </div>
                    <div class="center__title">
                        <div class="aside-box">
                            <aside>Recettes</aside>
                        </div>
                        <h3 class="heading-tertiary ">Apprenez à faire vos produits du quoditien. <span>en un rien de temps.</span> <span>pour trois fois rien.</span></h3>
                    </div>
                </section>
     
                <section class="slider">
                    <h5 class="heading-quinary headlines">derniers posts</h5>
                    <div class="slider__box">
                        <article class="slider__list">
                            {lastestRecipes.map(latestRecipe => (
                                <Slider
                                    key={latestRecipe.id}
                                    id={latestRecipe.id}
                                    title={latestRecipe.title}
                                    photo={latestRecipe.photo}
                                    name={latestRecipe.name}
                                    text={latestRecipe.text}/>            
                            ))}                      
                        </article>
                    </div>
                </section>
            </main>
      
            <footer class="footer">

            </footer>

        </div>
    )
}
 export default Home