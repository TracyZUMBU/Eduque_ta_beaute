import React, {useState, useEffect} from 'react'
import axios from 'axios'
import AllRecipes from './AllRecipes'

import logo_filter from '../img/filter.svg'


const FilterRecipes = () => {
  
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
    // Retrieve the id of intercategory
    const [idInterCat, setIdInterCat] = useState([])
    // Retrieve the id of subcategory
    const [idSub, setIdSub] = useState('')
    // Retrieve all recipes on DB
    const [allRecipes, setAllRecipes] = useState([])
    // Display recipes 
    const [showAllRecipes, setShowAllRecipes] = useState(true)

    useEffect(() => {
        // Retrieve all the categories of recipes
        const getCatRecipes = async () => {
            const url = 'http://localhost:4000/admin/catRecipes/'
            const result = await axios.get(url)
            setCatRecipes(result.data)
        }
        getCatRecipes()

        //Retrieve all recipes on DB
        const getAllRecipes = async () => {
            const url = 'http://localhost:4000/user/allRecipes/'
            const result = await axios.get(url)
            setAllRecipes(result.data)
        }
        getAllRecipes()
    }, [])

    // Display categories
    const toggleDropDown = () => {
        setShowCat(!showCat)
        // setShowInterCat(false)
        // setShowSubCat(false)
        console.log(showCat, showInterCat, showSubCat);
    }

    // Display all the intermediate categories based on category's id
    const displayInterCat = async (catID) => {
        
        const url = `http://localhost:4000/admin/interCat/${catID}`
        const result = await axios.get(url)
        // initialise InterCatRecipes with bdd result
        setInterCatRecipes(result.data)
        setIdCat(catID)
        setIdInterCat(result.data.cat_inter_id)
        setShowInterCat(true)
        setShowSubCat(false)
        //setShowRecipes(false)
        console.log(result.data, 'setInterCat', idInterCat,'ShowInterCat', showInterCat, showCat);
    }

    // Display subcategories 
    const getSubCat = async (idInter) => {
        const url = `http://localhost:4000/admin/subCat/${idInter}/${idCat}`
        const result = await axios.get(url)
        setSubCatRecipes(result.data)
        setShowSubCat(true)
    }

    // display recipes
    const getRecipes = async (idSub) => {
        setIdSub(idSub)
        setShowAllRecipes(false)
    }

    const filterRecipes = allRecipes.filter(allRecipe => allRecipe.sub_cat_id == idSub)
  
    return (
    <div class="recipePage_blockLeft">
        <div className="filtered_navigation">

            <div 
            onClick={()=> toggleDropDown()}
            class="logo_filter_box">
                <img className="logo-filter_image" src={logo_filter}/>
            </div>

            {showCat === true ?
             <nav className="dropdown-menu">
                 <>
                 <ul className="dropdown-menu__category">
                 {catRecipes.map(catRecipe => 
                    <li
                    key={catRecipe.id}                    
                    onMouseEnter={()=> displayInterCat(catRecipe.id)} 
                    className="dropdown-menu__category-items">
                    {catRecipe.name}
                    </li>
                    )}
                </ul>                    
                </>
                {showInterCat === true ?
                <div className='test'>
                {interCatRecipes.map(interCatRecipe =>
                 <ul 
                 className="dropdown-menu__interCat"
                 key={interCatRecipe.id}>
                    {interCatRecipe.name_cat_inter}
                    {subCatRecipes.map(subCatRecipe =>
                    <li>{subCatRecipe.name}</li>

                    )}
                </ul>
                    )}
                </div>
                : '' }
            </nav> :
            '' }

        </div>
        
        {/* <nav className="dropdown">
            {catRecipes.map(catRecipe => 
            <ul 
            className="dropdown__content--cat"
            onMouseEnter={() => getInterCat(catRecipe.id)}>
                <li className="cat_items"
                key={catRecipe.id}>
                {catRecipe.name}
                </li>
            </ul>
                )} 
           

                    {showInterCat === true ? interCatRecipes.map(interCatRecipe => 
                <ul  className="dropdown__content--interCat">                        
                    <li className="interCat_items"
                    key={interCatRecipe.cat_inter_id} 
                    onClick={() => getSubCat(interCatRecipe.cat_inter_id)}>
                    {interCatRecipe.name_cat_inter}
                    </li>
                </ul>
                    ) : ''}
               
            <ul className="dropdown__content--subCat">
                {subCatRecipes.map(subCatRecipe => 
                <li
                key={subCatRecipe.id} 
                onMouseEnter={()=> getRecipes(subCatRecipe.id)}>
                {subCatRecipe.name}
                </li>
                )}
            </ul>
        </nav> */}

        <div class="recipe-list-box">
                { showAllRecipes === true ? 
                    allRecipes.map(allRecipe => 
                    <AllRecipes
                    key={allRecipe.id}
                    id={allRecipe.id}
                    title={allRecipe.title}
                    created_at={allRecipe.created_at}
                    introduction={allRecipe.introduction}
                    photo={allRecipe.photo}
                    name={allRecipe.name}
                    ingredients={allRecipe.ingredients}/>
                    ) :
                    filterRecipes.map(filterRecipe =>
                    <AllRecipes
                    key={filterRecipe.id}
                    title={filterRecipe.title}
                    created_at={filterRecipe.created_at}
                    introduction={filterRecipe.introduction}
                    photo={filterRecipe.photo}
                    name={filterRecipe.name}/>
                    )
                }
        </div>
</div>
   
    )
}

export default FilterRecipes