// Ici sont toutes les routes qui concernent les users
const express = require("express")
const connection = require('../../conf')
const { Router } = require("express")

const router = express.Router()

// Retrieve all recipes based on subcategory's id
// router.get('/allrecipes/:idSub', (req, res) => {
//     const idSub = req.params.idSub
//     console.log(idSub);
    
//     connection.query('SELECT recipes.id, recipes.title, recipes.photo, recipes.text, recipes.introduction, recipes.created_at, recipes.sub_cat_id, cat_recipes.name  FROM recipes INNER JOIN cat_recipes ON recipes.cat_id = cat_recipes.id AND recipes.sub_cat_id = ? ORDER BY created_at DESC' , idSub, (err, results) => {
//         if(err) {
//             res.status(500).send('Error retrieving recipes')
            
//         }else {
//             res.status(200).json(results)
//         }
//     })  

// }) 

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
    connection.query('SELECT recipes.id, recipes.title, recipes.photo, recipes.text, recipes.introduction, recipes.created_at, recipes.sub_cat_id, cat_recipes.name  FROM recipes INNER JOIN cat_recipes ON recipes.cat_id = cat_recipes.id ORDER BY created_at DESC', (err, results) => {
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
    connection.query('SELECT * from ETB.recipes WHERE id = ?', id, (err, results) => {
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

    connection.query('SELECT * FROM ETB.comments WHERE recipe_id = ?', id, (err,results) => {
        if(err){
            res.status(500).send('Error retrieving comments')
        }else {
            res.status(200).json(results)
        }
    })
    
})


////////////////////////// POST //////////////////////

router.post('/postComment', (req, res) => { 
    const comment = req.body.comment
    console.log(comment);
    
    connection.query(`INSERT INTO ETB.comments (comments, user_id, recipe_id) VALUES ('${comment}', '3', '10')`,(err, results) => { 
        if(err) {
            return res.status(500).send('The comments has not been post')
        } else {
            res.status(200).send('the comments has been post')
        }
    })
})


module.exports = router


