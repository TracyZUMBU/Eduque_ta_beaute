import React, {useState, useEffect} from 'react'
import axios from 'axios'

export default function SectionRecipes() {

    //Retreive the lastest added recipes
    const [lastestRecipes, setLatestRecipes] = useState ([])
    //Retrieve all the categories of recipes
    const [catRecipes, setCatRecipes] = useState ([])
    //Display the categories name
    const [showCat, setShowCat] = useState(false)
    //Retrieve all the intermediate category based on category's id
    const [interCatRecipes, setInterCatRecipes] = useState ([])
    //Display the intermediate category name
    const [showInterCat, setShowInterCat] = useState(true)
    

    useEffect(() => {
       
        const getLatestRecipes = async () => {

            const url = 'http://localhost:8000/admin/recipes/'
            const result = await axios.get(url)

            setLatestRecipes(result.data)
        }
        
        getLatestRecipes()
    }, [])
    
    useEffect(() => {
        
        const getCatRecipes = async () => {
            
            const url = 'http://localhost:8000/admin/catRecipes/'
            const result = await axios.get(url)
            
            setCatRecipes(result.data)
            //console.log(result.data);
           
            //console.log(result.data[0].id);
        }

        getCatRecipes()
    }, [])


    //Retrieve the id of the category clicked
    const getIdCat = async (id) => {
     
        const url = `http://localhost:8000/admin/interCat/${id}`
        const result = await axios.get(url)
    
        setInterCatRecipes(result.data)
      
        
        
        
        



    }

    

    return (
        <div>
            <p>Les 10 dernières recettes</p>
            {lastestRecipes.map(lastestRecipe => (
                <p key={lastestRecipe.id}>{lastestRecipe.title}</p>
            ))}

        <div className="dropdown">
            <button onClick={() => setShowCat(!showCat) 
            } className="dropdown__btn">Catégorie</button>

            <div className="dropdown__content">
            {showCat === true ? 
            catRecipes.map(catRecipe => 
            <p key={catRecipe.id} onClick={ () => getIdCat(catRecipe.id)
            }>{catRecipe.name}</p>
            ) : <div></div> }</div>

            <div>
            {showInterCat === true ? 
            interCatRecipes.map(interCatRecipe => 
            <p key={interCatRecipe.cat_inter_id} >{interCatRecipe.name_cat_inter}</p>
            ) : <div></div> }
            </div>

        </div>




            


        </div>
    )
}
