import React, {useState, useEffect} from 'react'
import FilterRecipes from '../../components/FilterRecipes'
import DisplayModale from '../DisplayModale'
import axios from 'axios'


const SectionRecipes = () => {

    // lastest added recipes
    const [lastestRecipes, setLatestRecipes] = useState ([])

    const [toggleModale, setToggleModale] = useState (false)
    const [curId, setCurId] = useState ("")

    // Retrieve the lastest recipes
    useEffect(() => {
        
        const getLatestRecipes = async () => {
            const url = 'http://localhost:8000/admin/lastestRecipes/'
            const result = await axios.get(url)
            setLatestRecipes(result.data)
        }
        getLatestRecipes()
    }, [])

    // open the modale
    const openModale = (id) => {
        setToggleModale(true)
        console.log(toggleModale);
         setCurId(id)
        console.log(id);
    }

    //close the modale
    const closeModale = () => {
        console.log(curId);
       const url = `http://localhost:8000/admin/recipeDelete/${curId}`
        axios.delete(url)
        window.location.reload()
    }
    

    return (
        <div>
            <p>Les 10 dernières recettes</p>
            {lastestRecipes.map(lastestRecipe => (
                <p key={lastestRecipe.id}>{lastestRecipe.title} <i onClick={()=> openModale(lastestRecipe.id)}>x</i></p>
           
            ))}
            {toggleModale ? <DisplayModale closeFunc={closeModale}/> : ""}

            <FilterRecipes />
        </div>

    )
}
export default SectionRecipes