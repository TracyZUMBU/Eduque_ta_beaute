import React, {useEffect, useState} from 'react'
import {useParams} from 'react-router-dom'
import axios from 'axios'


export default function Profile() {

    const [users, setUser] = useState([])
    const { id } = useParams()

    useEffect(() => {

        const getUsers = async () => {
            
            const url = `http://localhost:8000/user/user/${id}`;
            const result = await axios.get(url)

            setUser(result.data)

        }
        getUsers()
    }, [id])

    return (
        
      
            <div>
            {users.map(user =>
            <p key={user.id}>{user.name}</p>
           // <li>{user.name}</li>
           
            )}
            </div>
        
    )
}
