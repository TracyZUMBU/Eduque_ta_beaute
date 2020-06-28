const jwt = require('jsonwebtoken')

module.exports = {
    validateRegister: (req, res, next) => {
      // username min length 3
      if (!req.body.username || req.body.username.length < 3) {
        return res.status(400).send({
          msg: 'Please enter a username with min. 3 chars'
        });
      }

      // password min 6 chars
      if (!req.body.password || req.body.password.length < 6) {
        return res.status(400).send({
          msg: 'Please enter a password with min. 6 chars'
        });
      }
  
      // password (repeat) does not match
      if (
        !req.body.password_repeat ||
        req.body.password != req.body.password_repeat
      ) {
        return res.status(400).send({
          msg: 'Both passwords must match'
        });
      }
  
      next();
    },
    
    isLoggedIn: (req, res, next) => {
      console.log("jjj", req.headers["x-access-token"]);
      
       const token = req.headers["x-access-token"]
       if (!token) return res.status(401).send('Access Denied');
  
       try {
         const verified = jwt.verify(token, process.env.JWT_SECRET);
         console.log(verified);
         
         req.user = verified;  
       } catch (err) {
         console.log("error token", err)  
        return res.status(400).send('Invalid Token')
       }  
 
    next();  
   // const bearerHeader = req.headers["Authorization"]
   // if (typeof bearerHearder !== 'undefined') {
   //   const bearer = bearerHeader.split(' ');
   //   const bearerToken = bearer[1];
   //   req.token = bearerToken;
   //   next();
   // }else {
   //   res.sendStatus(403)
   // }
   // }
 
 }  
}