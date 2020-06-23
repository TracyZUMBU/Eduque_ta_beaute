import React, {useState, useEffect} from 'react'
import axios from 'axios'


const Connexion = () => {

       // state Admin
       const [isAdmin, setAdmin] = useState(false)
       //state qui recoit la réponse du back
       const [backRes, setRes] = useState(false)
       //message sur le login en cas d'erreur
    
       const [email, setEmail] = useState();
       const [password, setPassword] = useState();
       const [response, setResponse] = useState({});
       //const isConnect = response.data.auth
       //console.log(isConnect);
       

    // useEffect(() => {
        
    //     console.log(response);
        
    //     if (localStorage.getItem('myConnection') === 'true') {
    //         setAdmin(true);
    //         console.log('yes');
            
    //     }
    //     else if (backRes.auth === true && isAdmin === false) {
    //         console.log('eee');
    
    //         setAdmin(true)
    //         // on stocke le state en local
    //         localStorage.setItem('myConnection', backRes.auth)
    //     }
    
    // }, [])
   
    
    useEffect(() => {   
        //console.log("response.auth", response.auth)

        const token = response.token

            
         if (localStorage.getItem('token') === token) {
        setAdmin(true);
        console.log('get', isAdmin);
            
    }else if (response.auth === true && isAdmin === false) {
        localStorage.setItem('token', response.token)
                
        setAdmin(true)
        console.log('set', isAdmin);
        
        // on stocke le state en local
          
    }    }, [response, isAdmin])

    useEffect(() => {
       
        console.log("isAdmin", isAdmin)
        }, [response, isAdmin])



    const handlePost = () => {

            // const url = 'http://localhost:8000/register/login';
            // axios.post(url, {password, email})
            // .then(res => setResponse(res))
            // console.log(response);
            console.log('hhhh',response);

            const url = 'http://localhost:8000/register/login';
            axios.post(url, {password, email})
            .then(res => setResponse(res.data))
            
        

            

        }

    const disconnect = () => {

        localStorage.removeItem('token')
        
    }


  


    return (
        <div>
            <form id="login">
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

            <input id="logout" type="button" value="Se déconnecter" onClick={() => disconnect()}/>

            
        </div>
    )
}

export default Connexion