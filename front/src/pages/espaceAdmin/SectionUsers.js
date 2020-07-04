import React, {useState, useEffect} from 'react'
import axios from 'axios'

import DisplayModale from '../DisplayModale'
import Header from '../../components/Header'
import Banner from '../../components/BannerCategory'


const SectionUsers = () => {

    const bannerName = "Espace Adminitrateur"
    // retrieve all users
    const [users, setUsers] = useState([])
    const [userID, setUserID] = useState()
    const [toggleModale, setToggleModale] = useState (false)

    useEffect(() => {
        const getUsers = async () => {
            const url = 'http://localhost:4000/admin/allUsers'
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
        const url = `http://localhost:4000/admin/userDelete/${userID}`
        axios.delete(url)
        window.location.reload()
    }

    return (
        <div>
            <Header/>
            <Banner bannerName={bannerName}/>
            <div class="user-list-container">
            {users.map(user => (
                <div class="user-list" key={user.id}>
                    <p class="user-list__name">{user.username}</p>
                    <p class="user-list__date">{user.registered}</p>
                    <img class="user-list__delete" onClick={() => openModale(user.id)} src="https://img.icons8.com/color/48/000000/delete-forever.png"/>
                </div>
            ))}
            </div>
            {toggleModale ? <DisplayModale closeFunc={deleteUser}/> : ""}
        </div>
    )
}

export default SectionUsers