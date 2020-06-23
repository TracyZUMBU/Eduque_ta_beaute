import React from 'react'

const DisplayModale = (props) => {

    return (
        <div  className='overlay'>
        <div className='contenu'>
            Etes-vous sûr de vouloir supprimer cette recette ?
            <button onClick={props.closeFunc} className='btnClose' >Oui</button>
        </div>
       
    </div>
    )
}
export default DisplayModale
