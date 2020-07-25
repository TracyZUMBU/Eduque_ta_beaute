import React, {useEffect, useState} from 'react'
import axios from 'axios'
import '../css/style.css';

import Header from '../components/Header'
import Slider from '../components/Slider'
import Footer from '../components/Footer'

import mainSlide from '../img/main_slide.jpeg'
import alternative from '../img/slide_alternative.jpeg'
import mode from '../img/slide_mode.jpg'
import blog from '../img/slide_blog.jpeg'

const Home = () => {
    
    // retrieve the lastest recipes
    const [lastestRecipes, setLatestRecipes] = useState ([])
    // increment index's images array
    const [index, setIndex] = useState(0)
    //target image of the carrousel
    let imgSlide = document.getElementById.src
    
    // images of carrousel
    const contentSlide = [
        {
            photo: mainSlide,
            title: "Recette",
            caption: "Apprenez à faire vos produits du quoditien, en un rien de temps ET pour trois fois rien."
        },
        {
            photo: alternative,
            title: "Alternative",
            caption: "Remplacez vos consommables du quotidien par des produits durables et réutilissables."
        },
        {
            photo: mode,
            title: "Mode",
            caption: "Achetez autrement :  de seconde main, en friperies, échangez OU même louez "
        },
        {
            photo: blog,
            title: "Blog",
            caption: "Informez-vous sur tous les sujets qui vous permettront de devenir un consom'acteur "
        }
    ]
    
    imgSlide = contentSlide[index].photo
    //target the title of the slide
    let titleSlide = contentSlide[index].title
    //target the caption of the slide
    let captionSlide = contentSlide[index].caption

    
    
    useEffect(() => {
        const getLatestRecipes = async () => {
            const url = 'http://localhost:4000/admin/lastestRecipes/'
            const result = await axios.get(url)
            setLatestRecipes(result.data)
            }
            getLatestRecipes();
        }, [])
        
        // Change slide every 4 sec
        const launchSlider = setTimeout(() => {
            const changeImgSetTimeout = () => {
                if (index < contentSlide.length - 1){
                    setIndex( index +1)
                } else {
                    setIndex(0)
                }
            }
            changeImgSetTimeout()
        }, 4000)
     
        
        // change slide onClick
        const changeImg = () => {
            if (index < contentSlide.length - 1){
                setIndex( index +1)
            } else {
                setIndex(0)
            }
        }
      

    return ( 
        <>
        <div class="grid-container">
            <Header/>

            <main class="main main--home">
                <section class="center">
                    <div class="center__image-box">
                        <img 
                            id="imageSlide" 
                            src={imgSlide} 
                            class="center__image"
                            onClick={() => changeImg()}
                        />
                    </div>
                    <div class="center__box">
                        <div class="aside-box">
                            <aside class="aside-title">{titleSlide}</aside>
                        </div>
                        <h3 class="heading-tertiary ">{captionSlide}</h3>
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
                                    preparation={latestRecipe.preparation}/>            
                            ))}                      
                        </article>
                    </div>
                </section>
            </main>
      
            

        </div>
         <Footer/>
         </>
    )
}
 export default Home