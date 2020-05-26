// Ici sont toutes les routes qui concernent les admins
const express = require("express")
const connection = require('../../conf')
const router = express.Router()


//Retrieve the 10 last recipes
router.get('/recipes', (req, res) => {
    connection.query('SELECT * FROM recipes ORDER BY created_at DESC LIMIT 3' , (err, results) => {
        if(err) {
            res.status(500).send('Error retrieving recipes')
            
        }else {
            res.status(200).json(results)
        }
    })

})



module.exports = router;