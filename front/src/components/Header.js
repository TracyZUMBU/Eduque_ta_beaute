import React from 'react'
import {Link} from 'react-router-dom'
import Navigation from './Navigation'

const Header = () => {
    return (
        <header class="header">
            <div class="bannerHeader"></div>
            <Navigation/>
        </header>
    )
}

export default Header
