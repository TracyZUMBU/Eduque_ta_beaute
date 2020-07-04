import React, {useState, useEffect} from 'react'
import axios from 'axios'

import DisplayModale from '../DisplayModale'
import Header from '../../components/Header'
import Banner from '../../components/BannerCategory'


const SectionUsers = () => {

    const bannerName = "Espace Adminitrateur"

    // retrieve all users
    const [users, setUsers] = useState([])
    //stock user's id
    const [userID, setUserID] = useState()
    //handle opening/closing of modal
    const [toggleModal, setToggleModal] = useState (false)

    useEffect(() => {
        const getUsers = async () => {
            const url = 'http://localhost:4000/admin/allUsers'
            const result = await axios.get(url)
            setUsers(result.data)
        }
        getUsers()
    }, [])

    // asking for confirmation
    const openModale = (userID) => {
        setUserID(userID)
        setToggleModal(true) 
    }

    const deleteUser = () => {
        const url = `http://localhost:4000/admin/userDelete/${userID}`
        axios.delete(url)
        setToggleModal(false)
    }

    // cancel deletion
    const closeModal = () => {
        setToggleModal(false)
    }

    return (
        <div class="container">
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
            {toggleModal ? <DisplayModale deletion={deleteUser} text={'cet utilisateur'} closeModal={closeModal}/> : ""}
        </div>
    )
}

export default SectionUsers