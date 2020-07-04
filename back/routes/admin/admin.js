// Ici sont toutes les routes qui concernent les admins
const express = require("express")
const connection = require('../../conf')
const router = express.Router()

/**
 * GET
 */

//Retrieve the lastest recipes
router.get('/lastestRecipes', (req, res) => {
    connection.query('SELECT recipes.id, recipes.title, recipes.photo, recipes.preparation, cat_recipes.name  FROM recipes INNER JOIN cat_recipes ON recipes.cat_id = cat_recipes.id ORDER BY created_at DESC LIMIT 4' , (err, results) => {
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

// Retrieve all recipes depending on sub category's id
router.get('/recipes/:idSub', (req,res) => {
    const idSub = req.params.idSub
    connection.query('SELECT * FROM ETB.recipes WHERE sub_cat_id = ?', idSub, (err,results) =>{
        if (err) {
            res.status(500).send('Error retrieving recipes')
        } else {
            res.status(200).json(results)
        }
    })
})

// Retrieve all users by ascendant order
router.get('/allUsers', (req,res) => {
    connection.query('SELECT users.id, users.username, users.email, DATE_FORMAT(registered, "%D %b %Y")AS registered FROM ETB.users ORDER BY registered DESC', (err,results) => {
        if(err) {
            res.status(500).send('Error retrieving users')
        }else {
            res.status(200).json(results)
        }
    })

}) 


/**
 * DELETE
 */

// Delete a recipe
router.delete('/recipeDelete/:id', (req,res) => {
    const id = req.params.id
    connection.query('DELETE FROM ETB.recipes WHERE id = ?', id, (err,results) => {
        if(err) {
            res.sendStatus(500).send('The recipe has not been deleted')
        }else {
            res.status(200).send('The recipes has been deleted')
        }
    })
})

// Delete a user
router.delete('/userDelete/:id', (req,res) => {
    const id = req.params.id
    connection.query('DELETE FROM ETB.users WHERE id = ?', id, (err,results) => {
        if(err) {
            res.sendStatus(500).send('The user has not been deleted')
        }else {
            res.status(200).send('The user has been deleted')
        }
    })
})


/**
 * ********************************** Post
 */

 // Add a new recipe
 router.post('/createRecipe', (req, res) => {
     const content = req.body
     connection.query(`INSERT INTO ETB.recipes (title, description, photo, preparation, ingredients, materiel) VALUES ('${content.title}', '${content.description}', '${content.photo}', '${content.preparation}', '${content.ingredients}', '${content.materiel}')`, (err, results) => {
         if (err) {
             console.log(err);
             res.status(500).send("the recipes has not been created") 
         } else {
             res.status(200).json(results)
         }
     })

 })


 // Add a image of a recipe
 router.post('/addImage', (req, res) => {
    const content = req.body
    connection.query('INSERT INTO ETB.photos SET ?', content, (err, results) => {
        if (err) {
            res.status(500).send("the recipes has not been created")
        } else {
            res.status(200).json(results)
        }
    })

})

module.exports = router;