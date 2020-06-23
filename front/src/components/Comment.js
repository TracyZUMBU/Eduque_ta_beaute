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

    useEffect(()=> {
        //Retrieve all recipes' comments
        const getComments = async () => {
            const url = `http://localhost:8000/user/comment/${idRecipe}`
            const result = await axios.get(url)
            setDisplayComment(result.data)
            console.log('from back', result.data, 'displayComment', displayComment);
        }
        getComments()

    },[]) 

    // Send user's comment to the back
    const handlePost = () => {
        const valuesComment = {comment, idRecipe}
        const url = 'http://localhost:8000/user/postComment'
        axios.post(url, valuesComment)
        .then(res => setResponse(res))
    }

    return (
        <div class="commentSection">
            <div class="displayComment">
                {displayComment.map(item => (
                    <>
                    <p>{item.username}</p>
                    <p>{item.created_at}</p>
                    <p>{item.comments}</p>
                    </>
                ))}
            </div>
            <div>
                <textarea name="comments" onChange={(e)=> setComment(e.target.value)} rows="5" cols="33"/>
                <input  type="button" value="Envoyer" onClick={() => handlePost()} />
            </div>
        </div>
    )
}

export default Comment