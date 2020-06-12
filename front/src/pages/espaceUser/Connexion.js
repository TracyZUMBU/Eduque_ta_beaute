import React, {useState, useEffect} from 'react'
import axios from 'axios'


export default function Connexion() {

       // state Admin
       const [isAdmin, setAdmin] = useState(true)
       //state qui recoit la réponse du back
       const [backRes, setRes] = useState(false)
       //message sur le login en cas d'erreur
       const [message, setMessage] = useState()
   

    useEffect(() => {
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

    let pathApi = process.env.REACT_APP_PATH_API_DEV 
    if (process.env.NODE_ENV === 'production') {
      pathApi = process.env.REACT_APP_PATH_API_PROD
      console.log('ttt');
       
    }else {
        console.log('yyyy');

    console.log(process.env.NODE_ENV);
    
        
    }
     
        
  
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [response, setResponse] = useState();

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
