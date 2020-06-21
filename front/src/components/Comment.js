import React, {useState, useEffect} from 'react'
import axios from 'axios'

const Comment =(props) => {
    
    
    const [comment, setComment] = useState()
    const [response, setResponse] = useState();
    const [displayComment, setDisplayComment] = useState([])
    console.log(props.idRecipe);
    const idRecipe = props.idRecipe;
    
    //const idCurRecipe = props.match.params.id

useEffect(()=> {
    const getComments = async () => {
        const url = `http://localhost:8000/user/comment/${idRecipe}`
        const result = await axios.get(url)
        setDisplayComment(result.data)
        console.log('from back', result.data, 'displayComment', displayComment);
    }
    getComments()

},[])

const handlePost = () => {
    //console.log(idCurRecipe);
    
    const url = 'http://localhost:8000/user/postComment'
    axios.post(url, {comment : comment})
    .then(res => setResponse(res))
    console.log('gg',comment);
}

    return (
        <div class="commentSection">
            <div class="displayComment">
   
    <p>date {displayComment.created_at}</p>
                <p>nom</p>
  
            </div>

        <div>
            
            <textarea name="comments" onChange={(e)=> setComment(e.target.value)} rows="5" cols="33"/>
            <input  type="button" value="Envoyer" onClick={() => handlePost()} />
            
        </div>
        </div>
    )
}

export default Comment