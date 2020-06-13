import React, {useState} from 'react'
import axios from 'axios'

export default function CreateProfile() {

    
    const [username, setUsername] = useState();
    const [password, setPassword] = useState();
    const [password_repeat, setPassword_repeat] = useState();
    const [email, setEmail] = useState();
    const [response, setResponse] = useState();
    const content = {username, email, password, password_repeat}

    const handlePost = () => {
        const url = 'http://localhost:8000/register/sign-up';
        axios.post(url, content)
        .then(res => setResponse(res))
    }

    return (
        <div>
            <p>Créer votre compte</p>
            <form>
                <label>
                    username :
                    <input type="text" name="username" onChange={(e)=> setUsername(e.target.value)} />
                </label>
                <label>
                    Email :
                    <input type="email" name="email" onChange={(e)=> setEmail(e.target.value)}/>
                </label>
                <label>
                    Mot de passe :
                    <input type="password" name="password" onChange={(e)=> setPassword(e.target.value)} />
                </label>
                <label>
                    Répétez le mot de passe :
                    <input type="password" name="password_repeat" onChange={(e)=> setPassword_repeat(e.target.value)} />
                </label>
                <input  type="button" value="Envoyer" onClick={() => handlePost()} />
            </form>
        </div>
    )
}
