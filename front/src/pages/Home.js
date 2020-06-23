import React, {useEffect, useState} from 'react'
import axios from 'axios'
import '../css/style.css';

import Header from '../components/Header'
import Slider from '../components/Slider'
import photo from '../img/flacon_white.jpg'

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
                        <img src={photo} class="center__image"></img>
                    </div>
                </section>
     
                <section class="slider">
                    <div class="slider__box">
                        <h3 class="heading-tertiary headlines">derniers posts</h3>
                        <div class="slider__list">
                            {lastestRecipes.map(latestRecipe => (
                                <Slider
                                    key={latestRecipe.id}
                                    id={latestRecipe.id}
                                    title={latestRecipe.title}
                                    photo={latestRecipe.photo}
                                    name={latestRecipe.name}
                                    text={latestRecipe.text}/>            
                            ))}                      
                        </div>
                    </div>
                </section>
            </main>
      
            <footer class="footer">

            </footer>

        </div>
    )
}
 export default Home