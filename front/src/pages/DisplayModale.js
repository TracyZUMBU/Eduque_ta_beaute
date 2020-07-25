import React from 'react'

const DisplayModale = (props) => {
    return (
        <div  class='overlay'>
            <div class='contenu'>
                Etes-vous sûr de vouloir supprimer {props.text} ?
                <button onClick={props.deletion} class='btnClose'>Oui</button>
                <button onClick={props.closeModal}>Annuler</button>
            </div>
        </div>
    )
}
export default DisplayModale
