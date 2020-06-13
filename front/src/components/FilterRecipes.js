import React, {useState, useEffect} from 'react'
import axios from 'axios'


export default function SectionRecipes(props) {
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
    // Retrieve recipes base on subcategories's id
    const [recipes, setRecipes] = useState([])
    // Display recipes 
    const [showRecipes, setShowRecipes] = useState(false)

    // Retrieve all the categories of recipes
    useEffect(() => {
        
       
        console.log("ggg", props.params);
        const getCatRecipes = async () => {
            
            const url = 'http://localhost:8000/admin/catRecipes/'
            const result = await axios.get(url)
            
            setCatRecipes(result.data)
            
            
        
        }

        getCatRecipes()
    }, [])

    // Display categories
    const toggleDropDown = () => {
        console.log(showCat);
        
        setShowCat(!showCat)
        setShowInterCat(false)
        setShowSubCat(false)
        
        console.log(showCat, showInterCat, showSubCat);
        
    }

    // Display all the intermediate categories based on category's id
    const getInterCat = async (id) => {
        
        const url = `http://localhost:8000/admin/interCat/${id}`
        const result = await axios.get(url)
        // initialise InterCatRecipes with bdd result
        setInterCatRecipes(result.data)
        setIdCat(id)
        setShowInterCat(true)
        setShowSubCat(false)
        setShowRecipes(false)
        
        
    
    }

    // Display subcategories 
    const getSubCat = async (idInter) => {

        const url = `http://localhost:8000/admin/subCat/${idInter}/${idCat}`
        const result = await axios.get(url)
        
        setSubCatRecipes(result.data)
        setShowSubCat(true)
        setShowRecipes(false)
          
    }

    const getRecipes = async (idSub) => {

       
        const url =`http://localhost:8000/admin/recipes/${idSub}`
        console.log(url);
        
        const result = await axios.get(url)
        
        setRecipes(result.data)
        setShowRecipes(true)
    }
    


return (
<div>

<div className="dropdown">

<button onClick={toggleDropDown 
} className="dropdown__btn">Catégorie</button>

<div className="dropdown__content--cat">
    {showCat === true ? 
    catRecipes.map(catRecipe => 
    <p key={catRecipe.id} onClick={() => getInterCat(catRecipe.id)
    }>{catRecipe.name}</p>
    ) : '' }
</div>

<div className="dropdown__content--interCat">
    {showInterCat === true ? 
    interCatRecipes.map(interCatRecipe => 
    <p key={interCatRecipe.cat_inter_id} onClick={() => getSubCat(interCatRecipe.cat_inter_id)} >{interCatRecipe.name_cat_inter}</p>
    ) : '' }
</div>


<div className="dropdown__content--subCat">
    { showSubCat === true && showInterCat === true && props.params === "recipes" ? 
    subCatRecipes.map(subCatRecipe => 
    <p key={subCatRecipe.id} onClick={()=> getRecipes(subCatRecipe.id)}>{subCatRecipe.name}</p>
    ) : ''}
</div>

</div>

<div className="recipes">
        { showRecipes === true ? 
        recipes.map(recipe =>
            <p key={recipe.id}>{recipe.title}</p>
            ) : ''}
</div>
</div>
)
        }