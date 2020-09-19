import React, {useState} from 'react'
import axios from 'axios'
import Header from '../../components/Header';

const CreateProfile = () => {

    
    const [username, setUsername] = useState();
    const [password, setPassword] = useState();
    const [password_repeat, setPassword_repeat] = useState();
    const [email, setEmail] = useState();
    const content = {username, email, password, password_repeat}
    const [response, setResponse] = useState();
    
    const handlePost = () => {
        const url = 'http://localhost:4000/register/sign-up';
        console.log(content);
        axios.post(url, content)
        .then(res => setResponse(res))
    }
    
    return (
        <div>
            <Header/>
            <div class="form-box">
                <form class="login_form">
                    <p class="login_title">Créer votre compte</p>
                        <input class="input_login" type="text" name="username" onChange={(e)=> setUsername(e.target.value)} placeholder="Username"/>
                        <input class="input_login" type="email" name="email" onChange={(e)=> setEmail(e.target.value)} placeholder="votre email"/>
                        <input class="input_login" type="password" name="password" onChange={(e)=> setPassword(e.target.value)} placeholder="votre mot de passe" />
                        <input class="input_login" type="password" name="password_repeat" onChange={(e)=> setPassword_repeat(e.target.value)} placeholder=" Répétez votre mot de passe"/>
                    <input  class="submit_login" type="button" value="Envoyer" onClick={() => handlePost()} />
                </form>
            </div>
        </div>
    )
}

export default CreateProfile