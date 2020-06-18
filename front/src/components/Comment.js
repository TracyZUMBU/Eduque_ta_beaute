import React, {useState} from 'react'
import axios from 'axios'

export default function Comment() {


const [comment, setComment] = useState()
const [response, setResponse] = useState();
console.log(comment);

const handlePost = () => {
    const url = 'http://localhost:8000/user/postComment'
    axios.post(url, comment)
    .then(res => setResponse(res))
}

    return (
        <div>
            
            <p>date</p>
            <p>nom</p>
            <textarea name="comments" onChange={(e)=> setComment(e.target.value)} rows="5" cols="33"/>
            <input  type="button" value="Envoyer" onClick={() => handlePost()} />
            
        </div>
    )
}
