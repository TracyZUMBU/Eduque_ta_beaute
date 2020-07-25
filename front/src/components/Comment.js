import React, {useState, useEffect, useRef} from 'react'
import axios from 'axios'

import logo_comment from '../img/chat.svg'

const Comment = (props) => {
    // stock the comment's user
    const [comment, setComment] = useState()
    // details' comments
    let valuesComment = {}
    // Retrieve the id of the recipe from the OnePAgeRecipe.js
    const idRecipe = props.idRecipe;
    //stock response from back
    const [response, setResponse] = useState();
    // Retrieve all recipes's comments
    const [displayComment, setDisplayComment] = useState([])
     // Stock details of the token after decodeding
     const [decodedToken, setDecodedToken] = useState({})
     const [isLoggedIn, setIsLoggedIn] = useState(false)
     //
     let form = useRef();
    
    useEffect(()=> {

        const getUserId = async () => {
            // 1.retrieve the token from localStorage
            const tokenFromStorage = localStorage.getItem('token');
             if(tokenFromStorage) {            
                // 2. retrieve the payload's token
                const base64Payload = tokenFromStorage.split('.')[1]
                // 3. decoded payload's token and parse it so that we can get the user id
                 setDecodedToken(JSON.parse(window.atob(base64Payload)))
                 //console.log(userId, decodedToken, decodedToken.id);
                 setIsLoggedIn(true)                 
            } else {
                return 'not token to parse'
            }
        }
        getUserId()

        //Retrieve all recipes' comments
        const getComments = async () => {
            const url = `http://localhost:4000/user/comment/${idRecipe}`
            const result = await axios.get(url)
            setDisplayComment(result.data)
        }
        getComments()


    },[response, isLoggedIn]) 


    // Send user's comment to the back
    const handlePost = () => {
        const userId = decodedToken.id
        valuesComment = {comment, idRecipe, userId}
        const url = 'http://localhost:4000/user/postComment'
        axios.post(url, valuesComment)
        .then(res => setResponse(res))
        //! TypeError: form.current.reset is not a function
            //form.current.reset();
    }

    return (
        <>
        <h2 class="commentSection__title"><img src={logo_comment}/>Commentaires</h2>
        <section class="commentSection">
            <div class="commentSection__displayComments-box">
                {displayComment.map(item => (
                    <div class="commentSection__displayComments">
                    <p class="name_comment"> {item.username}</p>
                    <p class="comment">{item.comments}</p>
                    <p class="date_comment">{item.created_at}</p>
                    </div>
                ))}
            </div>
            <div class="commentSection__writeComment">
                <h4 class="">Laissez un commentaire</h4>
                <textarea 
                    ref={form} 
                    class="type_comment" 
                    name="comment" 
                    onChange={(e)=> setComment(e.target.value)} 
                    placeholder={isLoggedIn ? "Vous avez testé la recette ? Qu'en avez-vous pensé ? " : "Connectez-vous, pour laisser un commentaire"} 
                    rows="5" 
                    cols="33"/>
                <input  
                    class="submitComment"
                    type="button" 
                    value="Envoyer" 
                    onClick={() => handlePost()} />
            </div>
        </section>
        </>
    )
}

export default Comment