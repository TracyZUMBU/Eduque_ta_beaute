import React from 'react'
import { Link } from 'react-router-dom'

import fb from '../img/logo_media/fb.png'
import google from '../img/logo_media/google-plus.png'
import pinterest from '../img/logo_media/pinterest.png'
import twitter from '../img/logo_media/twitter.png'
import youtube from '../img/logo_media/youtube.png'
import logoBrand from '../img/back_login.jpg'


const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer__container">
                <div>
                    <div className="footer__compartment footer__compartment--left">
                        <ul className="sitemap">
                            <li className="sitemap__item"><Link to=""> recettes</Link></li>
                            <li className="sitemap__item"><Link to=""> Contactez nous</Link></li>
                            <li className="sitemap__item"><Link to=""> FAQ</Link></li>
                            <li className="sitemap__item"><Link to=""> blog</Link></li>
                            <li className="sitemap__item"><Link to=""> qui sommes-nous ?</Link></li>
                        </ul>
                    </div>
                </div>
                <div>
                    <div className="footer__compartment footer__compartment--middle">
                        <p className="logo-name"><span className="eduque">Eduque</span><span className="beaute"> Ta Beauté</span></p>
                        <p className="caption">Lorem ipsum dolor sit amet, consectetur a dipiscing elit. Vivamus leo ante</p>
                        <div className="social-media_container">
                            <p>Suivez-nous</p>
                            <div className="social-media_logos">
                                <img src={fb} alt=""/>
                                <img src={twitter} alt=""/>
                                <img src={youtube} alt=""/>
                                <img src={pinterest} alt=""/>
                                <img src={google} alt=""/>
                            </div>
                        </div>
                    </div>
                </div>
                <div>
                    <div className="footer__compartment footer__compartment--right">
                        <p classname="">ETB késako ? </p>
                        <img src={logoBrand}/>
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer