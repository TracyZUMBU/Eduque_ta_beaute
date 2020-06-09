import React, {useState} from 'react'
import axios from 'axios'

export default function CreateProfile() {

    const [firstname, setFirstname] = useState();
    const [lastname, setLastname] = useState();
    const [password, setPassword] = useState();
    const [email, setEmail] = useState();
    const [response, setResponse] = useState();
    const content = {lastname, firstname, email, password}

    const handlePost = () => {
        console.log(content);
        
        const url = 'http://localhost:8000/user/userCreate';
        axios.post(url, content)
        .then(res => setResponse(res))
    }

    return (
        <div>
            <p>Créer votre compte</p>
            <form>
                <label>
                    Nom :
                    <input type="text" name="lastname" onChange={(e)=> setLastname(e.target.value)} />
                </label>
                <label>
                    Prénom :
                    <input type="text" name="firstname" onChange={(e)=> setFirstname(e.target.value)}/>
                </label>
                <label>
                    Email :
                    <input type="email" name="email" onChange={(e)=> setEmail(e.target.value)}/>
                </label>
                <label>
                    Mot de passe :
                    <input type="password" name="password" onChange={(e)=> setPassword(e.target.value)} />
                </label>
                <input  type="button" value="Envoyer" onClick={() => handlePost()} />
            </form>
        </div>
    )
}
