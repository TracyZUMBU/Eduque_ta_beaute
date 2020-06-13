import React, {useState} from 'react'
import axios from 'axios'
import DisplayModale from '../DisplayModale'

export default function UsersList(props) {
    
    const [toggleModale, setToggleModale] = useState (false)
    const [curId, setCurId] = useState ("")


    const openModale = (id) => {
        setToggleModale(true)
        console.log(toggleModale);
         setCurId(id)
        console.log(id);
        
        
    }

    const closeModale = () => {
        console.log(curId);
       const url = `http://localhost:8000/admin/userDelete/${curId}`
        axios.delete(url)
        window.location.reload()
    }

    
    return (
        <div>
            <ul>
                
                <li>{props.name} <i onClick={() => openModale(props.id)}>{props.id}</i> </li>
                <li>{props.email}</li>
                <li>{props.date}</li>
                
            </ul>

            {toggleModale ? <DisplayModale closeFunc={closeModale}/> : ""}
    

         

            
        </div>
  

      

        
    )
}
