import React, {useState, useEffect} from 'react'
import axios from 'axios'
import UsersList from './UsersList'

export default function SectionUser() {

    // retrieve all users
    const [users, setUsers] = useState([])
    const [asc, setAsc] = useState ("plus récent")

    useEffect(() => {

        const getUsers = async () => {

        const url = 'http://localhost:8000/admin/allUsers'
        const result = await axios.get(url)

        setUsers(result.data)
        
        
        
        }

        getUsers()
    }, [])

    const recent = async () => {

        const url = 'http://localhost:8000/admin/allUsersASC'
        const result = await axios.get(url)

        setUsers(result.data)
        console.log(result);
        
        
    }

    const older = async () => {

        const url = 'http://localhost:8000/admin/allUsersDESC'
        const result = await axios.get(url)

        setUsers(result.data)
        console.log(result);
        
        
    }

    return (
        <div>
            <button onClick={recent}>{asc}</button>
            {users.map(user => (
                <UsersList
                key={user.id}
                name={user.name}
                email={user.email}
                date={user.created_at}
                id={user.id}
                />
            ))}
          
        </div>
    )
}
