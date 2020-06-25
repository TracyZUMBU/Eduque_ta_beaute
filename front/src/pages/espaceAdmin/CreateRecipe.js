import React, {useState} from 'react'
import axios from 'axios'

import { Editor } from '@tinymce/tinymce-react';
import FilterRecipes from '../../components/FilterRecipes'


const CreateRecipe = (props) => {
 
    const handleEditorChange = (content, editor) => {
        console.log('Content was updated:', content);
      }
    
    const [text, setText] = useState()
    const [title, setTitle] = useState()
    const [materiel, setMateriel] = useState()
    const [photo, setPhoto] = useState()
    const [response, setResponse] = useState()
    const content = { title, photo ,materiel, text}
  
    const handlePost = () => {
        const url = `http://localhost:4000/admin/createArticle`
        axios.post(url, content)
        .then(res => setResponse(res))
        window.location.reload();
    }


    return (
        <div>
            <h1>Taper l'article</h1>
            {props.children}
            <input
                type="text"
                id="title"
                placeholder="un titre..."
                onChange={(e) => setTitle(e.target.value)}
            ></input>

            <input
                type="text"
                id="image"
                placeholder="Saisir l'URL de l'image"
                onChange={(e) => setPhoto(e.target.value)}
            ></input>

            <input
                type="text"
                id="Materiel"
                placeholder="quel contenant ?"
                onChange={(e) => setMateriel(e.target.value)}
            ></input>

            <input 
                type="text" 
                id="button-blue" 
                className="feedback-input" 
                onChange={(e) => setText(e.target.value)}>
            </input>

            <input 
                type="button" 
                id="text" 
                className="feedback-input" 
                value="Créer l'article" onClick={() => handlePost()} />
        <Editor
        initialValue="<p>This is the initial content of the editor</p>"
        init={{
            height: 500,
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
       
        onEditorChange={handleEditorChange}
        />

        </div>
    
    )
}

export default CreateRecipe
