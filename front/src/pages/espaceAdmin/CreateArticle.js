import React, {useState} from 'react'
// import { Editor } from "@tinymce/tinymce-react";

import FilterRecipes from '../../components/FilterRecipes'



import axios from 'axios'

export default function CreateArticle(props) {
 
    
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
            
            <FilterRecipes/>
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
            

            

            {/* <Editor
            initialValue={text}
            init={{
                forced_root_block : false,
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
            onChange={(e) => setText(e.target.getContent())}
          />

        <p>{text}</p> */}
        </div>
    )
}
