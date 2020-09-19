import React, {useState, useEffect} from 'react'
import axios from 'axios'

import ReactHtmlParser from 'react-html-parser';

import { Editor } from '@tinymce/tinymce-react';


const CreateRecipe = (props) => {
    
    // variables of categories
    const [category, setCategory] = useState([])
    const [interCat, setInterCat] = useState([])
    const [subCat, setSubCat] = useState([])

    // variables for stocking details' recipes
    const [preparation, setPreparation] = useState()
    const [title, setTitle] = useState()
    const [author, setAuthor] = useState()
    const [description, setDescription] = useState()
    const [photo, setPhoto] = useState()
    const [ingredients, setIngredients] = useState('')
    const [materiel, setMateriel] = useState()
    const [idCat, setIdCat] = useState()
    const [idInterCat, setIdInterCat] = useState()
    const [idSubCat, setIdSubCat] = useState()
    
    //Variables to be sent to the back
    const content = { title, photo ,description, preparation, ingredients, materiel, author, idCat, idInterCat, idSubCat}
    const [response, setResponse] = useState()

    useEffect(() => {
        
     const getCat = async () => {
         const url = 'http://localhost:4000/admin/catRecipes'
         const result = await axios.get(url)
         setCategory(result.data)
         console.log(result.data);
        }
        getCat()
 
     const getInterCat = async () => {
         const url = 'http://localhost:4000/admin/interCatRecipes'
         const result = await axios.get(url)
         setInterCat(result.data)
     }
     getInterCat()
 
     const getSubCat = async () => {
         const url = 'http://localhost:4000/admin/subCatRecipes'
         const result = await axios.get(url)
         setSubCat(result.data)
         
     }
     getSubCat()
       
    }, [])

    const handleSetIngredients = (content, editor) => {
        setIngredients(content)    
      }

      const handleSetPreparation = (content, editor) => {
          setPreparation(content)    
      }  

      const handleSetMateriel = (content, editor) => {
          setMateriel(content)    
        } 
        
        
    const handlePost = () => {
        const url = `http://localhost:4000/admin/createRecipe`
        axios.post(url, content)
        .then(res => setResponse(res))
        console.log(content);
        //! reset form
    } 
    console.log(category);
        
    
    return (
        <>
            <h1>Créer une nouvelle recette</h1>
            <form class="form_createRecipe">
                <input
                    class="input_form_createRecipe"
                    type="text"
                    id="title"
                    placeholder="un titre..."
                    onChange={(e) => setTitle(e.target.value)}
                ></input>

                <input
                    class="input_form_createRecipe"
                    type="text"
                    id="image"
                    placeholder="Saisir l'URL de l'image"
                    onChange={(e) => setPhoto(e.target.value)}
                ></input>

                <input
                    class="input_form_createRecipe"
                    type="text"
                    id="Materiel"
                    placeholder="quel contenant ?"
                    onChange={(e) => setDescription(e.target.value)}
                ></input>

                <input
                    class="input_form_createRecipe"
                    type="text"
                    id="author"
                    placeholder="Saisir le nom de l'auteur"
                    onChange={(e) => setAuthor(e.target.value)}
                ></input>

                    <label for="category-select">Sélectionner la catégorie de la recette</label>
                <select onChange={(e)=>setIdCat(e.target.value)} name="categories" id="category-select">
                    <option>Sélectionner la catégorie</option>
                    {category.map( el => (
                        <option
                        
                        key={el.id} 
                        value={el.id}
                        id="category-select">
                            {el.name}
                        </option>                        
                     ))}
                </select>

                    <label for="interCat-select">Sélectionner la catégorie intermédiare de la recette</label>
                <select onChange={(e)=>setIdInterCat(e.target.value)} name="categories" id="interCat-select">
                    <option>Sélectionner la catégorie intermédiare</option>
                    {interCat.map( el => (
                        <option
                        
                        key={el.id} 
                        value={el.id}
                        id="category-select">
                            {el.name_cat_inter}
                        </option>
                        
                     ))}
                </select>

                    <label for="subCat-select">Sélectionner la sous catégorie de la recette</label>
                <select onChange={(e)=>setIdSubCat(e.target.value)} name="categories" id="subCat-select">
                    <option>Sélectionner la sous-catégories</option>
                    {subCat.map( el => (
                        
                        <option
                        key={el.id} 
                        value={el.id}
                        id="category-select">
                            {el.name}
                        </option>
                        
                     ))}
                </select>

               

                <p>Saisir les ingrédients de la recette</p>
                <Editor
                initialValue="<p>Saisir les ingrédients de la recette</p>"
                init={{
                    content_css : "./css/style.css",
                    theme_advanced_font_sizes: "10px,12px,13px,14px,16px,18px,20px",
                    font_size_style_values : "10px,12px,13px,14px,16px,18px,20px",
                    height: 400,
                    width: 1000,
                    menubar: false,
                    plugins: [
                        'advlist autolink lists link image charmap print preview anchor',
                        'searchreplace visualblocks code fullscreen',
                        'insertdatetime media table paste code help wordcount'
                    ],
                    toolbar:
                    'undo redo | formatselect | bold italic backcolor | \
                    alignleft aligncenter alignright alignjustify | \
                    bullist numlist outdent indent | removeformat | help'
                }}
            
                onEditorChange={handleSetIngredients}
                /> 

                <Editor
                initialValue="<p>détailler les étapes de la recette</p>"
                init={{
                    content_css : "./css/style.css",
                    theme_advanced_font_sizes: "10px,12px,13px,14px,16px,18px,20px",
                    font_size_style_values : "10px,12px,13px,14px,16px,18px,20px",
                    height: 400,
                    width: 1000,
                    menubar: false,
                    plugins: [
                        'advlist autolink lists link image charmap print preview anchor',
                        'searchreplace visualblocks code fullscreen',
                        'insertdatetime media table paste code help wordcount'
                    ],
                    toolbar:
                    'undo redo | formatselect | bold italic backcolor | \
                    alignleft aligncenter alignright alignjustify | \
                    bullist numlist outdent indent | removeformat | help'
                }}
            
                onEditorChange={handleSetPreparation}
                /> 

<Editor
                initialValue="<p>lister le matériel nécessaire pour la recette</p>"
                init={{
                    content_css : "./css/style.css",
                    theme_advanced_font_sizes: "10px,12px,13px,14px,16px,18px,20px",
                    font_size_style_values : "10px,12px,13px,14px,16px,18px,20px",
                    height: 400,
                    width: 1000,
                    menubar: false,
                    plugins: [
                        'advlist autolink lists link image charmap print preview anchor',
                        'searchreplace visualblocks code fullscreen',
                        'insertdatetime media table paste code help wordcount'
                    ],
                    toolbar:
                    'undo redo | formatselect | bold italic backcolor | \
                    alignleft aligncenter alignright alignjustify | \
                    bullist numlist outdent indent | removeformat | help'
                }}
            
                onEditorChange={handleSetMateriel}
                /> 
                

                <input
                    class="input_form_createRecipe"  
                    type="button" 
                    id="text" 
                    value="Créer la nouvelle recette" 
                    onClick={() => handlePost()} />
            </form>
            

        </>
    
    )
}

export default CreateRecipe
