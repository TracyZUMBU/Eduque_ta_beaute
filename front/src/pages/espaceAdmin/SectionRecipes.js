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
    //Retrieve subcategories 
    const [subCatRecipes, setSubCatRecipes] = useState([])
    //Display the intermediate category name
    const [showInterCat, setShowInterCat] = useState(false)
    // display the subcategory name
    const [showSubCat, setShowSubCat] = useState(false)
    // Retrieve the id of category
    const [idCat, setIdCat] = useState('')
    
    
    
//Retrieve the lastest recipes
    useEffect(() => {
       
        const getLatestRecipes = async () => {

            const url = 'http://localhost:8000/admin/lastestRecipes/'
            const result = await axios.get(url)

            setLatestRecipes(result.data)
        }
        
        getLatestRecipes()
    }, [])
    
    // Retrieve all the categories of recipes
    useEffect(() => {
        
        const getCatRecipes = async () => {
            
            const url = 'http://localhost:8000/admin/catRecipes/'
            const result = await axios.get(url)
            
            setCatRecipes(result.data)
        
        }

        getCatRecipes()
    }, [])

    // Display
    const toggleDropDown = () => {
        setShowCat(!showCat)
        console.log('heelo');
        setShowInterCat(!showInterCat)
       
        
    }

    // Retrieve the id of the category clicked and stock it
    const getIdCat = async (id) => {
     
        const url = `http://localhost:8000/admin/interCat/${id}`
        const result = await axios.get(url)
    
        setInterCatRecipes(result.data)
        setIdCat(id)
        //console.log(id);
        

    }

    // Retrieve the subcategories 
    const getIdInterCat = async (idInter) => {

        const url = `http://localhost:8000/admin/subCat/${idInter}/${idCat}`
        const result = await axios.get(url)
        
        setSubCatRecipes(result.data)
        console.log(idCat, idInter);
        console.log(result.data);
          
    }
    

    return (
        <div>
            <p>Les 10 dernières recettes</p>
            {lastestRecipes.map(lastestRecipe => (
                <p key={lastestRecipe.id}>{lastestRecipe.title}</p>
            ))}

        <div className="dropdown">
            <button onClick={toggleDropDown 
            } className="dropdown__btn">Catégorie</button>

            <div className="dropdown__content--cat">
            {showCat === true ? 
            catRecipes.map(catRecipe => 
            <p key={catRecipe.id} onClick={() => getIdCat(catRecipe.id)
            }>{catRecipe.name}</p>
            ) : '' }</div>

            <div className="dropdown__content--interCat">
            {showInterCat === true ? 
            interCatRecipes.map(interCatRecipe => 
            <p key={interCatRecipe.cat_inter_id} onClick={() => getIdInterCat(interCatRecipe.cat_inter_id)} >{interCatRecipe.name_cat_inter}</p>
            ) : '' }
            </div>

            <div className="dropdown__content--subCat">
                { showSubCat === true && showInterCat === true ? 
                subCatRecipes.map(subCatRecipe => 
                <p key={subCatRecipe.id}>{subCatRecipe.name}</p>
                ) : ''}
            </div>


        </div>




            


        </div>
    )
}
