import React, {useState, useEffect} from 'react'
import axios from 'axios'

const Comment =(props) => {
    
    // stock the comment
    const [comment, setComment] = useState()
    //send the comment to the back
    const [response, setResponse] = useState();
    // Retrieve all recipes's comments
    const [displayComment, setDisplayComment] = useState([])
    // Retrieve the id of the recipe from the OnePAgeRecipe.js
    const idRecipe = props.idRecipe;
    const valuesComment = {comment, idRecipe}
    
    useEffect(()=> {
        //Retrieve all recipes' comments
        const getComments = async () => {
            const url = `http://localhost:4000/user/comment/${idRecipe}`
            const result = await axios.get(url)
            setDisplayComment(result.data)
            console.log('from back', result.data, 'displayComment', displayComment);
        }
        getComments()

    },[]) 

    // Send user's comment to the back
    const handlePost = () => {
        const url = 'http://localhost:4000/user/postComment'
        axios.post(url, valuesComment)
        .then(res => setResponse(res))
        //! Relance la fonction getComments
    }

    return (
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
                <textarea class="type_comment" name="comment" onChange={(e)=> setComment(e.target.value)} placeholder="Vous avez testé la recette ? Qu'en avez-vous pensé ? " rows="5" cols="33"/>
                <input  class="submitComment"type="button" value="Envoyer" onClick={() => handlePost()} />
            </div>
        </section>
    )
}

export default Comment