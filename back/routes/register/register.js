const express = require("express")
const connection = require('../../conf')

const router = express.Router()

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const userMiddleware = require('../middleware/user.js');


//Authentification
require('dotenv').config(process.cwd(), '../../.env')
const secret = process.env.JWT_SECRET

router.post('/sign-up', userMiddleware.validateRegister,(req, res,next) => {
    const content = req.body                
    console.log(content);
    
    connection.query('SELECT * FROM ETB.users WHERE LOWER(username) = ?', content.username,
    (err, resultat) => {
       console.log(resultat);
       
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



router.post('/login', (req, res, next) => {
    const email = req.body.email
    const password = req.body.password
    connection.query( 
        `SELECT * FROM ETB.users WHERE email = ?;`, email,
        (err, result) => {
            console.log(result[0]);
            
            if (err) {
                return res.status(500).send(err)
              } else if (!result[0]){ // on verifie la presnec d'un resultat dans la reponse
                return res.status(409).send('Unknown user') // si pas de resultat l'email n'est pas enregistre en base donc l'utilisateur est inconnu
              } 

          // check password
            const passwordIsValid = bcrypt.compareSync(password, result[0].password);
            console.log(passwordIsValid); 
        
            if(!passwordIsValid){
                console.log('wrong password');
                
                return res.status(401).send({ auth: false, token: null })
            }

          // Token creation 
          console.log('1', result[0].id);
          const token = jwt.sign(// on utilise sign de jwt pour creer le token
            {id : result[0].id, email: result[0].email}, // on rentre les information de l'utilisateur dont on a besoin en front 
            'secret_key', // correspond a une chaine de caractere permettant de chiffrer la signature du token
            {
              expiresIn: '24h'// fixe la duree de vie du token
            },
            { algorithm: 'RS256' }// specifie l'algorithme de chiffrage utilise 
          );
            console.log(token); 
            res.header("Access-Control-Expose-Headers", "x-access-token") // On crer le header de la reponse
            res.set("x-access-token", token) // on ajoute le token au header
            res.status(200).send({ auth: true }) // on envoie la reponse
            
            
            connection.query(`UPDATE ETB.users SET last_login = now() WHERE id = '${result[0].id}'` )

    }); 
})


router.get('/secret-route', (req, res, next) => {
  res.send('This is the secret content. Only logged in users can see that!');
});



module.exports = router