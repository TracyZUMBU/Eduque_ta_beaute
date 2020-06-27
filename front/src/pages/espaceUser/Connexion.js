import React, {useState, useEffect} from 'react'
import axios from 'axios'
import {Link} from 'react-router-dom'
import Header from '../../components/Header'



const Connexion = () => {

       // state Admin
       const [isAdmin, setAdmin] = useState(false)
       //state qui recoit la réponse du back
       const [backRes, setRes] = useState(false)
    
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
        const token = response.token  
        if (localStorage.getItem('token') === token) {
            setAdmin(true);
            console.log('get', isAdmin);
        } else if (response.auth === true && isAdmin === false) {
            localStorage.setItem('token', response.token)      
            setAdmin(true)
            console.log('set', isAdmin);    
        } 
    }, [response, isAdmin])

    useEffect(() => {
        console.log("isAdmin", isAdmin)
    }, [response, isAdmin])

    const handlePost = () => {
        console.log('hhhh',response);
        const url = 'http://localhost:4000/register/login';
        axios.post(url, {password, email})
        .then(res => setResponse(res.data))
        //! il faut set le const isLoggedIn to true
        //! renvoyer à la page d'accueil
        }


    return (
        <>
            <Header/>
            <div class="form-box">
                <form id="login" class="login_form">
                        <p class="login_title">Connectez-vous</p>
                    <label for="email">
                        </label>
                        <input class="input_login" id="email" type="email" name="email" placeholder="Votre email" onChange={(e)=> setEmail(e.target.value)}/>
                    
                    <label for="password">
                        </label>
                        <input class="input_login" id="password" type="password" name="password" onChange={(e)=> setPassword(e.target.value)} placeholder="**********"/>
                
                        <input  class="submit_login" type="button" value="SE CONNECTER" onClick={() => handlePost()} />   
                </form>
            </div>
        </>
    )
}

export default Connexion