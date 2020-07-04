import React, {useState, useEffect} from 'react'
import axios from 'axios'
import {Redirect} from 'react-router-dom';
import {Link} from 'react-router-dom'
import Header from '../../components/Header'




const Connexion = (props) => {

       // state Admin
       const [isAdmin, setAdmin] = useState(false)
       //state qui recoit la réponse du back
       const [response, setResponse] = useState({});
       //id of user
       const [idUser, setIdUser] = useState()
       const [email, setEmail] = useState();
       const [password, setPassword] = useState();
      
   
    
    useEffect(() => {   
        const token = response.token 
        const idUser = response.idUser 

        if (localStorage.getItem('token') === token) {
            setAdmin(true);
            console.log('get', isAdmin);
        } else if (response.auth === true && isAdmin === false) {
            localStorage.setItem('token', response.token)      
            setAdmin(true)
            console.log('set', isAdmin);    
        }

        // retrive the id's user from the token
        if(idUser){
            setIdUser(response.idUser)
            //!return  <Redirect  to="/home"/>
        } else {
            console.log("didn't get the id users");
        }
        
    }, [response, isAdmin])

    //! à supprimer
    useEffect(() => {
        console.log("isAdmin", isAdmin, "idUser", idUser, response.idUser, response.auth)
    }, [response, isAdmin])

    const handlePost = () => {
        console.log('hhhh',response);
        const url = 'http://localhost:4000/register/login';
        axios.post(url, {password, email})
        .then(res => setResponse(res.data))
        }


    return (
        <>
            <Header idUser={idUser}/>
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