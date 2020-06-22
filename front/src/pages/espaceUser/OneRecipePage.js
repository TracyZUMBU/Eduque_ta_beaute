import React, { useEffect,useState } from 'react'
import Header from '../../components/Header'
import axios from 'axios'
import Comment from '../../components/Comment'

export default function OneRecipePage(props) {

    const [recipe, setrecipe] = useState([])
    const [idRecipe, setIdRecipe] = useState()
    const id = props.match.params.id

    useEffect(() => {
        setIdRecipe(id)
        console.log('id',id,idRecipe);
        
        const getRecipe = async () => {

            const url = `http://localhost:8000/user/recipe/${id}`
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

            {recipe.map(recipeItem => (
                <>
                <div class="image-box">
                    <img class="image" src={recipeItem.photo}/>
                </div>
                <div class="heading">
                    <aside class="recipes-info__category_name">{recipeItem.name}
                    </aside>
                    <aside class="recipes-info__date">{recipeItem.created_at}
                    </aside>
                    <h2 class="heading-secondary heading-secondary--big">{recipeItem.title}</h2>
                    <p>by author</p>
                </div>
                <div class="recipes-details"></div>
                </>


            ))}
            <Comment idRecipe={id}/>
            </main>
            
        </div>
    )
}
