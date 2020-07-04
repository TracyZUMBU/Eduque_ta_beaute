import React, {useState} from 'react'
import axios from 'axios'

import ReactHtmlParser from 'react-html-parser';

import { Editor } from '@tinymce/tinymce-react';


const CreateRecipe = (props) => {
 
   
    const [preparation, setPreparation] = useState()
    const [title, setTitle] = useState()
    const [description, setDescription] = useState()
    const [photo, setPhoto] = useState()
    const [response, setResponse] = useState()
    const [ingredients, setIngredients] = useState('')
    const [materiel, setMateriel] = useState()
    const content = { title, photo ,description, preparation, ingredients, materiel}

    const handleSetIngredients = (content, editor) => {
        setIngredients(content)    
        console.log(ingredients);
      }

      const handleSetPreparation = (content, editor) => {
        setPreparation(content)    
        console.log(preparation);
      }  

      const handleSetMateriel = (content, editor) => {
        setMateriel(content)    
        console.log(materiel);
      } 
    
  
    const handlePost = () => {
        const url = `http://localhost:4000/admin/createRecipe`
        axios.post(url, content)
        .then(res => setResponse(res))
        //window.location.reload();
    } 


    return (
        <>
            <h1>Créer une nouvelle recette</h1>
            <div class="form_createRecipe">
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

                {/* <input
                    class="input_form_createRecipe" 
                    type="text" 
                    id="button-blue"
                    placeholder="Détailler les étapes de la recette" 
                    onChange={(e) => setPreparation(e.target.value)}/> */}

               

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
            </div>
            

    <div>{ReactHtmlParser(ingredients)}</div>

        </>
    
    )
}

export default CreateRecipe
