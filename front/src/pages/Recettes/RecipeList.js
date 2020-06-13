import React from 'react'

export default function RecipeList(props) {
    console.log('rrrrr',props);


    
    return (
        <div>
            <ul>
                
                <li>{props.title}</li>
                <li>{props.materiel}</li>
                <li>{props.text}</li>
            </ul>
                <img alt='recipe' src={props.photo}/>
    

         

            
        </div>
  

      

        
    )
}
