import React from 'react'

export default function UsersList(props) {
    console.log('rrrrr',props);


    
    return (
        <div>
            <ul>
                
                <li>{props.name}</li>
                <li>{props.email}</li>
                <li>{props.date}</li>
            </ul>
    

         

            
        </div>
  

      

        
    )
}
