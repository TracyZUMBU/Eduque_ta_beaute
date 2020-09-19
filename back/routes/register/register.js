const express = require("express");
const app = express();
const connection = require("../../conf");
require("dotenv").config(process.cwd(), "../.env");

const router = express.Router();

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const userMiddleware = require("../middleware/user.js");

const expressJwt = require("express-jwt");
const { isLoggedIn } = require("../middleware/user.js");

//Authentification
const secret = process.env.JWT_SECRET;

app.use(expressJwt({ secret: secret }).unless({ path: ["/Connexion"] }));

//route to create a new user
router.post("/sign-up", userMiddleware.validateRegister, (req, res, next) => {
  const content = req.body;

  //check if the user's email typed is already existed
  connection.query(
    "SELECT * FROM ETB.users WHERE LOWER(username) = ?",
    content.email,
    (err, resultat) => {
      //email is already in use
      if (resultat.length) {
        return res.status(409).send({
          msg: "This email is already in use!",
        });
      } else {
        // email is available
        console.log("email is available");
      }
    }
  );

  //encryped the password typed
  const password = bcrypt.hashSync(content.password);

  // enter the user's details into the DBB
  connection.query(
    `INSERT INTO ETB.users (username, email, password) VALUES ('${content.username}', '${content.email}', '${password}')`,
    (err, result) => {
      if (err) {
        console.log('err for inserting new user:', err)
        return res.status(500).send("Cannot register the user");
      } else {
        connection.query(
          `SELECT id FROM ETB.users WHERE email = ?`, content.email, (err,results) => {
            if (err) {
              console.log("err for getting the user's id:", err)
              return res.status(500).send(err)
            }else {
              console.log("id of the user:", results);
              res.status(200).send({
               msg:"the user has been registered",
               userId: results
              })
            }
          }
        )
      }
    }
  );
});



//////////////////////////////// LOGIN ROUTE 

router.post("/login", (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  /**
   * Recuperation de l'utilisateur par son email
   */

  connection.query(
    `SELECT * FROM users WHERE email = ?`,
    email,
    (err, result) => {
      if (err) {
        console.log("err 1");
        return res.status(500).send(err);
      } else if (!result[0]) {
        // on verifie la presnec d'un resultat dans la reponse
        console.log("err 2");
        return res.status(409).send({ msg: "Unknown user" }); // si pas de resultat l'email n'est pas enregistre en base donc l'utilisateur est inconnu
      }

      /**
       * Test du mot de passe envoye.
       */

      const passwordIsValid = bcrypt.compareSync(password, result[0].password); // comparaison entre le mot de passe envoye et le hash suvegarde en base grace a compareSync de bcrypt
      if (!passwordIsValid) {
        console.log("err 3");
        return res.status(401).send({ auth: false, token: null }); // Si passwordValid est false le mot de passe est faux, on renvoie donc une 401
      }

      /**
       * Construction du token
       */

      const token = jwt.sign(
        // on utilise sign de jwt pour creer le token
        {
          id: result[0].id,
          email: result[0].email,
          type: result[0].type,
          username: result[0].username,
        }, // on rentre les information de l'utilisateur dont on a besoin en front
        secret, // correspond a une chaine de caractere permettant de chiffrer la signature du token
        {
          expiresIn: "24h", // fixe la duree de vie du token
        },
        { algorithm: "RS256" } // specifie l'algorithme de chiffrage utilise
      );
      console.log("err 4");

      res.header("Access-Control-Expose-Headers", "x-access-token"); // On crer le header de la reponse
      res.set("x-access-token", token); // on ajoute le token au header
      res.status(200).send({ auth: true, token: token, idUser: result[0].id }); // on envoie la reponse
      connection.query(
        `UPDATE ETB.users SET last_login = now() WHERE id = '${result[0].id}'`
      );
    }
  );
});

router.get("/home", isLoggedIn, (req, res, next) => {
  res.json({
    data: req.user,
  });
});

module.exports = router;
