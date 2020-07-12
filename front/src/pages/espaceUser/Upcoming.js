import React from 'react'
import Header from '../../components/Header'

const Upcoming = ({match}) => {
    return (
        <>
          <Header/>
    <div className="background_upcomingPage">Cette partie du site est en construction {match.params.pages}</div>  
        </>
    )
}

export default Upcoming