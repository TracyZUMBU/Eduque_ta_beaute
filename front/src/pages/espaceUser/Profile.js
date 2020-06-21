import React, {useEffect, useState} from 'react'
import {useParams} from 'react-router-dom'
import axios from 'axios'


export default function Profile(props) {

    const [users, setUser] = useState([])
    const id = props.match.params.id
    console.log(id);
    

    useEffect(() => {

        const getUsers = async () => {
            
            const url = `http://localhost:8000/user/user/${id}`;
            const result = await axios.get(url)

            setUser(result.data)
            console.log(users);
            

        }
        getUsers()
    }, [])

    return (
        
      
            <div>
            {users.map(user =>
            <p key={user.id}>{user.username}</p>
           // <li>{user.name}</li>
           
            )}
            </div>
        
    )
}
