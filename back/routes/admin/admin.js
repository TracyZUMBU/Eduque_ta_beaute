// Ici sont toutes les routes qui concernent les admins
const express = require("express")
const connection = require('../../conf')
const router = express.Router()


//Retrieve the 10 lastest recipes
router.get('/recipes', (req, res) => {
    connection.query('SELECT * FROM recipes ORDER BY created_at DESC LIMIT 3' , (err, results) => {
        if(err) {
            res.status(500).send('Error retrieving recipes')
            
        }else {
            res.status(200).json(results)
        }
    })

})

// Retrieve all the categories of recipes
router.get('/catRecipes', (req, res) => {
    connection.query(`SELECT * FROM cat_recipes`, (err,results) => {
        if (err) {
            res.status(500).send('Error retrieving cat_repices')
        }else res.status(200).json(results)
    })
})

// Retrieve all the intermediate categories depending on id's category
router.get('/interCat/:id', (req, res) => {
    const id = req.params.id
    connection.query('SELECT cat_inter_id, name_cat_inter FROM cat_has_cat_inter INNER JOIN cat_inter_recipes on cat_has_cat_inter.cat_inter_id = cat_inter_recipes.id WHERE cat_id = ? ', id, (err,results) => {
        if (err) {
            res.status(500).send('Error retrieving cat_repices')
        } else {
            res.status(200).json(results)
        }
        })
})



module.exports = router;