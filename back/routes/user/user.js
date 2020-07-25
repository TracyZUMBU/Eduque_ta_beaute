const bcrypt = require('bcryptjs');
const userMiddleware = require('../middleware/user.js');



// Ici sont toutes les routes qui concernent les users
const express = require("express")
const connection = require('../../conf')
const { isLoggedIn } = require("../middleware/user");
const { Router } = require('express');
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
    connection.query('SELECT *, DATE_FORMAT(recipes.created_at, "%M %d, %Y") AS created_at, recipes.id AS id FROM ETB.recipes INNER JOIN cat_recipes ON recipes.cat_id = cat_recipes.id ORDER BY created_at DESC', (err, results) => {
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
    connection.query('SELECT *, DATE_FORMAT(recipes.created_at, "%M %d, %Y") AS created_at from ETB.recipes INNER JOIN cat_recipes ON recipes.cat_id = cat_recipes.id AND recipes.id = ?', id, (err, results) => {
        if (err) {
            res.status(500).send('Error retrieving the recipe')
        }else {
            res.status(200).json(results)
        }
    })
})

//Retrieve user datas
router.get('/user/:id', isLoggedIn, (req,res) => {
    const id = req.params.id
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
 
// return the amount of like for a recipe
router.get('/countLikes/:recipeId', (req,res) => {
    const recipeId = req.params.recipeId
    connection.query(`SELECT COUNT(*) AS total FROM likes WHERE recipe_id = ?`, recipeId, (err, results) => {
        if(err){
            res.status(500).send('Error retrieving comments')
        }else {
            res.status(200).json(results)
        }
    }) 
})

// return recipes which were liked by user
router.get('/recipeLiked/:userID', (req,res) => {
    const userID = req.params.userID
    connection.query(`SELECT recipe_id from likes where user_id = ?`, userID, (err, results) => {
        if(err){
            res.status(500).send('Error retrieving comments')
        }else {
            res.status(200).json(results)
        }
    })
})

// return recipes which were liked by user
router.get('/recipeFavorited/:userID', (req,res) => {
    const userID = req.params.userID
    connection.query(`SELECT recipe_id from favorites where user_id = ?`, userID, (err, results) => {
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
    console.log(valuesComment);
    
    connection.query(`INSERT INTO ETB.comments (comments, user_id, recipe_id) VALUES ("${valuesComment.comment}","${valuesComment.userId}", '${valuesComment.idRecipe}')`, (err, results) => { 
        if(err) {
            console.log(err);
            
            return res.status(500).send('The comments has not been post')
        } else {
            res.status(200).send('the comments has been post')
        }
    })
}) 
 
// add a recipe to the favorite list
router.post('/addFavorite', (req, res) => {
    const recipeID = req.body.recipeID
    const userId = req.body.userId
    connection.query (`INSERT INTO ETB.favorites (recipe_id, user_id) VALUES ('${recipeID}', '${userId}')`, (err, results) => {
        if(err) { 
            console.log(err);
            return res.status(500).send('The recipe has not been saved to favorite list')
        } else {
            res.status(200).send('the recipe has been saved to favorite list')
        }
    })  
}) 

// add a recipe to the favorite list
router.post('/addLike', (req, res) => {
    const recipeID = req.body.recipeID
    const userId = req.body.userId
    connection.query (`INSERT INTO ETB.likes (recipe_id, user_id) VALUES ('${recipeID}', '${userId}')`, (err, results) => {
        if(err) { 
            console.log(err);
            return res.status(500).send('The recipe has not been saved to favorite list')
        } else {
            res.status(200).send('the recipe has been saved to favorite list')
        }
    })
    
}) 


////////////////////////// PUT //////////////////////

// Update user's details
router.put('/updateDetails', userMiddleware.validateNewRegister, (req, res) => {
    const details = req.body
    const password = bcrypt.hashSync(details.newPassword)
    connection.query(`UPDATE ETB.users SET email='${details.newEmail}', password='${password}' WHERE id= '${details.id}'`, (err, results) => {
        if(err) { 
            console.log(err);
            return res.status(500).send('The new details have not been saved')
        } else {
            res.status(200).send('the new details have been saved')
        }
    })
})
module.exports = router


////////////////////////// DELETE //////////////////////

// Delete a recipe
router.delete('/delete_recipe/:id', (req,res) => {
    const recipeID = req.params.id
    const userID = req.body.userID
    console.log('userID', userID, 'recipeID', recipeID, 'reqBody', req.body);
    
    connection.query(`DELETE FROM ETB.favorites WHERE user_id = '${userID}' AND recipe_id = '${recipeID}'`, (err,results) => {
        if(err) {
            res.status(500).send('The recipe has not been deleted')
        }else {
            res.status(200).send('The recipes has been deleted')
        }
    })
})

router.delete('/deleteLike/:userID/:recipeID', (req,res) => {
    const recipeID = req.params.recipeID
    const userID = req.params.userID
    connection.query(`DELETE FROM ETB.likes WHERE user_id = '${userID}' AND recipe_id = '${recipeID}'`, (err, results) => {
        if(err) {
            res.status(500).send('The like has not been deleted')
        }else {
            res.status(200).send('The like has been deleted')
        }
    })
})

router.delete('/deleteFavorite/:userID/:recipeID', (req,res) => {
    const recipeID = req.params.recipeID
    const userID = req.params.userID
    connection.query(`DELETE FROM ETB.favorites WHERE user_id = '${userID}' AND recipe_id = '${recipeID}'`, (err, results) => {
        if(err) {
            res.status(500).send('The like has not been deleted')
        }else {
            res.status(200).send('The like has been deleted')
        }
    })
}) 