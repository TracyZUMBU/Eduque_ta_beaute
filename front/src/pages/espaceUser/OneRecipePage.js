import React, { useEffect,useState } from 'react'
import Header from '../../components/Header'
import axios from 'axios'

export default function OneRecipePage(props) {

    const [recipe, setrecipe] = useState([])

    useEffect(() => {
        const id = props.match.params.id
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
                <div class="heading">
                    <aside class="recipes-info__category_name">{recipe.name}
                    </aside>
                    <aside class="recipes-info__date">{recipe.created_at}
                    </aside>
                    <h2 class="heading-secondary heading-secondary--big">{recipe.title}</h2>
                    <p>by author</p>
                </div>

                <div class="image-box">
                    <img class="image" src={recipe.photo}/>
                </div>

                <div class="recipes-details"></div>

            </main>
            
        </div>
    )
}