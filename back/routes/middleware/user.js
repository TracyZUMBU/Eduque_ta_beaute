// middleware/users.js

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
      console.log(req.headers);
      
      const authHeader = req.headers['authorization']
      const token = authHeader && authHearder.split('')[1]
      if (token == null) return res.sendStatus(401)

      jwt.verify(token, secret, (err, user) => {
        if(err) return res.sendStatus(403)
      })
  }

};