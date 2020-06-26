import React, { useEffect,useState } from 'react'
import Header from '../../components/Header'
import axios from 'axios'
import Comment from '../../components/Comment'

import mail from '../../img/mail.svg'

const OneRecipePage = (props) => {

    const [recipe, setrecipe] = useState([])
    const [idRecipe, setIdRecipe] = useState()
    const id = props.match.params.id

    useEffect(() => {
        setIdRecipe(id)
        console.log('id',id,idRecipe);
        
        const getRecipe = async () => {

            const url = `http://localhost:4000/user/recipe/${id}`
            const result = await axios.get(url)
            setrecipe(result.data)
            console.log('recipe',recipe)
            console.log('from back', result.data);
        }
        getRecipe()
    },[])

    return (
        <div>
            <Header/>
            <main class="main">
                <div class="frame">
                    <div class="recipePage_blockLeft">
                    {recipe.map(recipeItem => (
                    <>
                    <div class="heading heading--oneRecipe">
                         <div class="recipe-info recipe-info--oneRecipe">   
                            <aside class="recipe-info__category_name recipes-info__category_name">{recipeItem.name}
                            </aside>
                            <aside class="recipe-info__date recipe-info__date--oneRecipe">{recipeItem.created_at}
                            </aside>
                        </div>
                        <h2 class="heading-secondary heading-secondary--big">{recipeItem.title}</h2>
                        <p class="author_recipe"><em>by</em> author</p>
                    </div>
                    <div class="image-box">
                        <img class="image image--oneRecipe" src={recipeItem.photo}/>
                    </div>
                <div class="recipes-details"></div>
                </>
                ))}
                    <Comment idRecipe={id}/>
                </div>
                    <div class="recipePage-blockRight">
                         <p class="recipePage-blockRight__text"> <span>Des idées ?</span> <span>Des astuces ?</span>  <span>Des recettes ?</span>  Ecolo, Ecocome et Simplissime à faire ? <span>Envoi-les nous.</span> On les publiera sur le site</p>
                         <img src={mail}/>
                    </div>
            </div>
            </main>
            
        </div>
    )
}

export default OneRecipePage