import React, {useState, useEffect} from 'react'
import axios from 'axios'

import DisplayModale from '../DisplayModale'


const SectionUsers = () => {

    // retrieve all users
    const [users, setUsers] = useState([])
    const [userID, setUserID] = useState()
    const [toggleModale, setToggleModale] = useState (false)

    useEffect(() => {
        const getUsers = async () => {
            const url = 'http://localhost:8000/admin/allUsers'
            const result = await axios.get(url)
            setUsers(result.data)
        }
        getUsers()
    }, [])

    const openModale = (userID) => {
        setUserID(userID)
        setToggleModale(true)
        console.log(toggleModale);
       
    }

    const deleteUser = () => {
        const url = `http://localhost:8000/admin/userDelete/${userID}`
        axios.delete(url)
        window.location.reload()
    }

    return (
        <div>
            {users.map(user => (
                <div class="" key={user.id}>
                    <p>{user.username}</p>
                    <p>{user.registered}</p>
                    <img onClick={() => openModale(user.id)} src="https://img.icons8.com/color/48/000000/delete-forever.png"/>
                </div>
            ))}
            {toggleModale ? <DisplayModale closeFunc={deleteUser}/> : ""}
        </div>
    )
}

export default SectionUsers