// Ici sont toutes les routes qui concernent les users
const express = require("express")
const connection = require('../../conf')

const router = express.Router()

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

// Retrieve all the subcategories of recipes depending on id's category and id's intermediate category
router.get('/subCat/:idInter/:idCat', (req,res) => {
    const idInter = req.params.idInter
    const idCat = req.params.idCat
    connection.query('SELECT * FROM sub_cat_recipes WHERE cat_inter_id = ?  AND cat_id = ?', [idInter,idCat], (err,results) => {
        if (err) {
            res.status(500).send('Error retrieving cat_repices')
        } else {
            res.status(200).json(results)
        }
    })
})

// Retrive all recipes depending on sub category's id
router.get('/recipes/:id', (req,res) => {
    const id = req.params.id
    connection.query('SELECT * FROM ETB.recipes WHERE sub_cat_id = ?', id, (err,results) =>{
        if (err) {
            res.sendStatus(500).send('Error retrieving recipes')
        } else {
            res.status(200).json(results)
        }
    })
})

//Retrieve user datas
router.get('/user/:id', (req,res) => {
    const id = req.params.id
    console.log(id)
    
    connection.query('SELECT * FROM ETB.users WHERE id = ?', id, (err,results) => {
        if(err){ 
            res.sendStatus(500).send('Error retrieving recipes')
        } else {
            res.status(200).json(results)
        }
    })
    
})

/////////////////////////////// POST ///////////////////////////////////

// Send a new profile to the BDD
router.post('/userCreate', (req, res) => {
    const content = req.body
    console.log(content);
    connection.query('INSERT INTO ETB.users SET ?', content, (err, results) => {
        if(err){
            res.status(500).send('Error creating a user')
        }else {
            res.status(200).json(results)
        }
    })

} )

module.exports = router


