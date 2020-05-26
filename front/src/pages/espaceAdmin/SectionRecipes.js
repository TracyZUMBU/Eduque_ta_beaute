import React, {useState, useEffect} from 'react'
import axios from 'axios'

export default function SectionRecipes() {

    const [lastestRecipes, setLatestRecipes] = useState ([])

    useEffect(() => {
       
        const getLatestRecipes = async () => {

            const url = 'http://localhost:8000/admin/recipes/'
            const result = await axios.get(url)

            setLatestRecipes(result.data)
            console.log(result.data);
        }

        getLatestRecipes()
    }, [])

    return (
        <div>
            <p>Les 10 dernières recettes</p>
        </div>
    )
}
