import React, { useEffect, useState } from 'react'
import { Link } from "react-router-dom";
import axios from 'axios';
import heart from '../img/heart.svg'
import like from '../img/like.svg'

const  AllRecipes = (props) => {
 
   
    const [decodedToken, setDecodedToken] = useState({})
    // store user's id from decoded token
    const userId = decodedToken.id

    //Stock response from back
    const [response, setResponse] = useState();

    // amount of likes of recipe
    const [totalLikes, setTotalLikes] = useState([])
    // recipe liked from the user
    const [recipeLiked, setrecipeLiked] = useState([])
    
    
    useEffect(() => {
        const getUserId = () => {
            // 1.retrieve the token from localStorage
            const tokenFromStorage = localStorage.getItem('token');
            if(tokenFromStorage) {            
                // 2. retrieve the payload's token
                const base64Payload = tokenFromStorage.split('.')[1]
                // 3. decoded payload's token and parse it so that we can get the user id
                setDecodedToken(JSON.parse(window.atob(base64Payload)))
                //console.log(JSON.parse(window.atob(base64Payload)));
                
            } else {
                return 'not token to parse'
            }
        }
        getUserId()
        
        const getAmountOfLikes = async () => {
            const recipeId = props.id;
            const url = `http://localhost:4000/user/countLikes/${recipeId}`;
            const result = await axios.get(url);
            setTotalLikes(result.data);
        }
        getAmountOfLikes()
        
        const getRecipeLiked = async () => {
            //! can't reach variable userId
            console.log(userId); //output: undefined
           
            const url = `http://localhost:4000/user/recipeLiked/14`
            const result = await axios.get(url)
            setrecipeLiked(result.data)
        }
        getRecipeLiked()

     
    }, [response])


    // send the recipe favorited to the DB
    const handlePostFavorite = (recipeID) => {
        const url = 'http://localhost:4000/user/addFavorite';
        axios.post(url, {userId: userId, recipeID: recipeID})
        .then(res => setResponse(res));
        
    }

    const handlePostLike = (recipeID) => {
        //Check if recipe is already liked
        const alreadyLiked = recipeLiked.find( ({recipe_id}) => recipe_id == recipeID)

        if (alreadyLiked){
            //unliked
            const url = `http://localhost:4000/user/deleteLike/${userId}/${recipeID}`
            axios.delete(url)
            .then(res => setResponse(res))
        } else {
            //liked
            const url = 'http://localhost:4000/user/addLike';
            axios.post(url, {userId: userId, recipeID: recipeID})
            .then(res => setResponse(res));
        }

    }

    return (

        <div class="recipes-list">
            <div key={props.id}class="recipes-list__items">
                <div class="recipes-list__image-box">
                    <Link to={`/recipe/${props.id}`}>
                    <img class="recipes-list__image" src={props.photo}/></Link>
                </div>
                <div class="recipes-list__content-box">
                    <div class="recipe-info">
                        <aside class="recipe-info__category_name">{props.name}</aside>
                        <aside class="recipe-info__date">{props.created_at
                        }</aside>
                    </div>
                    <Link to={`/recipe/${props.id}`}><h3 class="heading-tertiary heading-tertiary--small">{props.title}</h3></Link>
                    <p class="recipe-intro">{props.introduction}</p>
                    <div class="repice-icons-box">
                        <i class=" material-icons md-light repice-icons repice-icons--like" onClick={()=> handlePostLike(props.id)}>thumb_up</i>
                        <img class="repice-icons" onClick={()=> handlePostFavorite(props.id)} src={heart}/>
                        {totalLikes.map(totalLike =>
                        <span  class="like">{totalLike.total} likes</span>)}
                    </div>
                </div>
            </div>
        </div>
       

    )
}

export default AllRecipes