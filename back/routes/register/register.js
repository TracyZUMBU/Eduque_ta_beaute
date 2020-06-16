const express = require("express")
const connection = require('../../conf')

const router = express.Router()

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const userMiddleware = require('../middleware/user.js');



//Authentification
require('dotenv').config(process.cwd(), '../.env')
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
              } else if (!result[0]){ 
              
                return res.status(409).send('Unknown user') 
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
          const token = jwt.sign(
            {id : result[0].id, email: result[0].email, type : result[0].type},  
            secret, 
            {
              expiresIn: '24h'
            },
            { algorithm: 'RS256' }
          );
            console.log(token);

            //res.header("Access-Control-Expose-Headers", "x-access-token") 
            
             
            res.header("x-access-token", token); 
            res.status(200).send({ auth: true })
            
            connection.query(`UPDATE ETB.users SET last_login = now() WHERE id = '${result[0].id}'` )

    }); 
})


    
router.get('/secret-route', userMiddleware.isLoggedIn, (req, res, next) => {
  res.json({
    posts: {
     title: "my first post",
      description: 'blabla'
    }
  }); 
   
 
  
}); 
 
module.exports = router 