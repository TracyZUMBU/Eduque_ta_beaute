import React, {useState, useEffect} from 'react'
import axios from 'axios'
import UsersList from '../espaceAdmin/UsersList'

const Secret = () => {

    // retrieve all users
    const [users, setUsers] = useState([])
    const [asc, setAsc] = useState ("plus récent")
    const response = localStorage.getItem('token')

    useEffect(() => {
         
        // const config = {};
        // console.log(response);
        // console.log(response.mytoken);
        
        
        // config.headers= {"x-access-token" : response}
        
        // console.log(config);
        
         const getUsers = async () => {
            
        const url = 'http://localhost:8000/register/secret-route' 
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

export default Secret
