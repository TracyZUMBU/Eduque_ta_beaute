import React, {useEffect, useState} from 'react'
import {useParams} from 'react-router-dom'
import axios from 'axios'


export default function Profile(props) {
    // Retrieve user's details
    const [users, setUser] = useState([])
    //Retrieve the user's favorite recipes
    const [favorite, setFavorite] = useState([])
    //Retrieve the user's id
    const id = props.match.params.id
    

    useEffect(() => {
        const getUser = async () => {
            const url = `http://localhost:8000/user/user/${id}`;
            const result = await axios.get(url)
            setUser(result.data)
        }
        getUser();

        const getFavorite = async () => {
            const url = `http://localhost:8000/user/favorite/${id}`
            const result = await axios.get(url)
            setFavorite(result.data)

        }
        getFavorite();
    }, [])

    return (
        <div>
            {users.map(user =>
            
            <div key={user.id}>
                <p>{user.username}</p>
                <p>{user.email}</p>
            </div>
            )}

            {favorite.map(el => 
            <div key={el.id}>
                <p>{el.title}</p>
                <img src={el.photo}/>
            </div>
            )}
        </div> 
    )
}
