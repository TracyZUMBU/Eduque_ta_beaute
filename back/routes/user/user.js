// Ici sont toutes les routes qui concernent les users
const express = require("express")
const connection = require('../../conf')
const { Router } = require("express")
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
            res.status(500).send('Error retrieving recipes')
        } else {
            res.status(200).json(results)
        }
    })
})
 
// Retrieves all recipes
router.get('/allRecipes', (req,res) => {
    connection.query('SELECT recipes.id, recipes.title, recipes.photo, recipes.text, recipes.introduction, DATE_FORMAT(recipes.created_at, "%M %d, %Y") AS created_at, recipes.sub_cat_id, cat_recipes.name  FROM recipes INNER JOIN cat_recipes ON recipes.cat_id = cat_recipes.id ORDER BY created_at DESC', (err, results) => {
        if (err) {
            res.status(500).send('Error retrieving recipes')
        } else {
            res.status(200).json(results)
        }
    }) 
})

// Retrieve one recipe 
router.get('/recipe/:id', (req,res) => {
    const id = req.params.id
    connection.query('SELECT * from ETB.recipes INNER JOIN cat_recipes ON recipes.cat_id = cat_recipes.id AND recipes.id = ?', id, (err, results) => {
        if (err) {
            res.status(500).send('Error retrieving the recipe')
        }else {
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
            res.status(500).send('Error retrieving recipes')
        } else {
            res.status(200).json(results)
        }
    })
    
})

// Retrieve all comments based on recipe's id
router.get('/comment/:id', (req,res) => {
    const id = req.params.id 
    console.log(id);

    connection.query('SELECT comments.id, comments.comments, DATE_FORMAT(comments.created_at, "%M %d, %Y %H:%i AM") AS created_at, users.username FROM ETB.comments INNER JOIN users ON comments.user_id = users.id AND  recipe_id = ?', id, (err,results) => {
        if(err){
            res.status(500).send('Error retrieving comments')
        }else {
            res.status(200).json(results)
        }
    })
    
})

// Retrieve favorite recipes
router.get('/favorite/:id', (req,res) => {
    const userID = req.params.id
    console.log(userID);

    connection.query(`SELECT favorites.id, recipes.id AS recipeID, recipes.title, recipes.photo, sub_cat_recipes.name AS subcat, cat_recipes.name AS category
    FROM ETB.recipes 
    INNER JOIN favorites 
    ON recipes.id = favorites.recipe_id 
    INNER JOIN ETB.sub_cat_recipes 
    ON recipes.sub_cat_id = sub_cat_recipes.id
    INNER JOIN ETB.cat_recipes
    ON recipes.cat_id = cat_recipes.id   
    AND favorites.user_id = ? `, userID, (err, results) => {
        if(err){
            res.status(500).send('Error retrieving comments')
        }else {
            res.status(200).json(results)
        }
    })
    
})


////////////////////////// POST //////////////////////

// post a comment
router.post('/postComment', (req, res) => { 
    const valuesComment = req.body
    console.log(valuesComment.idRecipe);
    
    connection.query(`INSERT INTO ETB.comments (comments, recipe_id) VALUES ('${valuesComment.comment}', '${valuesComment.idRecipe}')`, (err, results) => { 
        if(err) {
            return res.status(500).send('The comments has not been post')
        } else {
            res.status(200).send('the comments has been post')
        }
    })
}) 
 
// add a recipe to the favorite list
router.post('/addFavorite', (req, res) => {
    const recipeID = req.body.recipeID
    console.log(recipeID);
    connection.query (`INSERT INTO ETB.favorites (recipe_id) VALUES ('${recipeID}')`,recipeID, (err, results) => {
        if(err) { 
            return res.status(500).send('The comments has not been post')
        } else {
            res.status(200).send('the recipe has been saved to favorite list')
        }
    })
    
})

module.exports = router


