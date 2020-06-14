import React, {useState, useEffect} from 'react'
import axios from 'axios'


export default function Connexion() {

       // state Admin
       const [isAdmin, setAdmin] = useState(true)
       //state qui recoit la réponse du back
       const [backRes, setRes] = useState(false)
       //message sur le login en cas d'erreur
    
       const [email, setEmail] = useState();
       const [password, setPassword] = useState();
       const [response, setResponse] = useState();
       //const isConnect = response.data.auth
       //console.log(isConnect);
       

    useEffect(() => {
        
        console.log(response);
        
        if (localStorage.getItem('myConnection') === 'true') {
            setAdmin(true);
            console.log('yes');
            
        }
        else if (backRes.auth === true && isAdmin === false) {
            console.log('eee');
            
            setAdmin(true)
            // on stocke le state en local
            localStorage.setItem('myConnection', backRes.auth)
        }
        
    }, [])



const handlePost = () => {

        const url = 'http://localhost:8000/register/login';
        axios.post(url, {password, email})
        .then(res => setResponse(res))

    }

    return (
        <div>
            <label>
                    Email :
                    <input type="email" name="email" onChange={(e)=> setEmail(e.target.value)}/>
                </label>
                <label>
                    Mot de passe :
                    <input type="password" name="password" onChange={(e)=> setPassword(e.target.value)} />
                </label>
                <input  type="button" value="Envoyer" onClick={() => handlePost()} />
        </div>
    )
}
