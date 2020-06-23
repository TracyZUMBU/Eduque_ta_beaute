import React, {useState} from 'react'
import axios from 'axios'

import FilterRecipes from '../../components/FilterRecipes'


const CreateRecipe = (props) => {
 
    
    const [text, setText] = useState()
    const [title, setTitle] = useState()
    const [materiel, setMateriel] = useState()
    const [photo, setPhoto] = useState()
    const [response, setResponse] = useState()
    const content = { title, photo ,materiel, text}
  
    const handlePost = () => {
        const url = `http://localhost:8000/admin/createArticle`
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
        </div>
    )
}

export default CreateRecipe
