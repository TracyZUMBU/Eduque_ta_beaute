const express = require("express")
const app = express ();
const connection = require('../../conf')
require('dotenv').config(process.cwd(), '../.env')

const router = express.Router()

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const userMiddleware = require('../middleware/user.js');

const expressJwt = require('express-jwt');
const { isLoggedIn } = require("../middleware/user.js");

//Authentification
const secret = process.env.JWT_SECRET

app.use(expressJwt({ secret : secret}).unless({path : ['/Connexion']}))



router.post('/sign-up', userMiddleware.validateRegister,(req, res,next) => {
    const content = req.body                
    console.log(content);
    
    connection.query('SELECT * FROM ETB.users WHERE LOWER(username) = ?', content.username,
    (err, resultat) => {
       console.log(resultat);
          //username is already in use
        if (resultat.length) {
          return res.status(409).send({
            msg: 'This username is already in use!'
          });
        } else {
          // username is available
          console.log('username is available');
        }})

    const password = bcrypt.hashSync(content.password)
        
    console.log(password);
    connection.query(  
      
    `INSERT INTO ETB.users (username, email, password) VALUES ('${content.username}', '${content.email}', '${password}')`, 
    (err, result) => { 
        if (err) {
            return res.status(500).send('Cannot register the user')
    
    } else {
        res.status(200).send('the user has been registered')
    }
    
});
}); 


router.post('/login', (req, res)=>{
const email = req.body.email
const password = req.body.password

/**
 * Recuperation de l'utilisateur par son email
 */

connection.query(`SELECT * FROM users WHERE email = ?`, email, (err, result)=>{
  if (err) {
    console.log('err 1');
    
    return res.status(500).send(err)
  } else if (!result[0]){ // on verifie la presnec d'un resultat dans la reponse
  console.log('err 2');
    return res.status(409).send('Unknown user') // si pas de resultat l'email n'est pas enregistre en base donc l'utilisateur est inconnu
  }

  /**
   * Test du mot de passe envoye.
   */

  const passwordIsValid = bcrypt.compareSync(password, result[0].password); // comparaison entre le mot de passe envoye et le hash suvegarde en base grace a compareSync de bcrypt
  if (!passwordIsValid){
    console.log('err 3');
    return res.status(401).send({ auth: false, token: null }); // Si passwordValid est false le mot de passe est faux, on renvoie donc une 401 
  }
  
  /**
   * Construction du token
   */

  const token = jwt.sign(// on utilise sign de jwt pour creer le token
    {id : result[0].id, email: result[0].email, type: result[0].type}, // on rentre les information de l'utilisateur dont on a besoin en front 
    secret, // correspond a une chaine de caractere permettant de chiffrer la signature du token
    {
      expiresIn: '1h'// fixe la duree de vie du token
    },
    { algorithm: 'RS256' }// specifie l'algorithme de chiffrage utilise
  );
  console.log('err 4');
  
  res.header("Access-Control-Expose-Headers", "x-access-token") // On crer le header de la reponse
  res.set("x-access-token", token) // on ajoute le token au header
  res.status(200).send({ auth: true, token: token }) // on envoie la reponse
  connection.query(`UPDATE ETB.users SET last_login = now() WHERE id = '${result[0].id}'` )
});
})
 


router.get('/home', isLoggedIn, (req, res, next) => {
  // jwt.verify(req.token, secret, (err, data) => {
  //   // if (err) {
  //   //   res.sendStatus(403);
  //   // }else {
  console.log('back');
  
  
      res.json({
        data: req.user 
      });    
  //   }
  // } )

  
  
}); 
 
module.exports = router  