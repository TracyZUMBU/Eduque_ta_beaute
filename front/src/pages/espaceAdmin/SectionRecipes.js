import React, {useState, useEffect} from 'react'
import FilterRecipes from '../../components/FilterRecipes'
import axios from 'axios'


export default function SectionRecipes() {

    // lastest added recipes
    const [lastestRecipes, setLatestRecipes] = useState ([])

    
    
    
// Retrieve the lastest recipes
    useEffect(() => {
       
        const getLatestRecipes = async () => {

            const url = 'http://localhost:8000/admin/lastestRecipes/'
            const result = await axios.get(url)

            setLatestRecipes(result.data)
        }
        
        getLatestRecipes()
    }, [])
 
    return (
        <div>
            <p>Les 10 dernières recettes</p>
            {lastestRecipes.map(lastestRecipe => (
                <p key={lastestRecipe.id}>{lastestRecipe.title}</p>
            ))}

            <FilterRecipes/>
         
        </div>

    )
}
