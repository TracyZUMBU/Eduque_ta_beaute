import React, { useEffect, Component } from 'react';
import {BrowserRouter as Router, Route, Redirect, Switch} from 'react-router-dom'

import './css/style.css';

import Home from './pages/Home'
import Categories from './pages/Recettes/Categories';
import InterCat from './pages/Recettes/InterCat';
import Subcat from './pages/Recettes/SubCat';
import Connexion from './pages/espaceUser/Connexion';
import Profile from './pages/espaceUser/Profile';
import HomeAdmin from './pages/espaceAdmin/HomeAdmin';
import SectionRecipes from './pages/espaceAdmin/SectionRecipes';
import SectionUsers from './pages/espaceAdmin/SectionUsers'
import Comment from './components/Comment'
import CreateProfile from './pages/espaceUser/CreateProfile';
import RecipesPage from './pages/espaceUser/RecipesPage';
import OneRecipePage from './pages/espaceUser/OneRecipePage';
import CreateRecipe from './pages/espaceAdmin/CreateRecipe';
import Header from './components/Header';
import decode from 'jwt-decode'

function App() {

  // Check if the user if authentificated
  const checkAuth = () => {
    
    // 1. stock token from localstorage
    const token = localStorage.getItem('token');
    // 2. verify if there is a token
    if (!token) {
      return false;
    }
    // 3. verify if the token has been expired
    try {
      const { exp } = decode(token);
      if (exp < new Date().getTime() / 1000) {
        return false;
      }
    } catch (e) {
        return false;
    }
    return true;
  }

  // Verify if the user has a token before redirecting 
  const AuthRoute = ({ component: Component, ...rest}) => (
    <Route {...rest} render={props => (
      checkAuth() ? (
        <Component {...props}/>
      ) : (
        <Redirect to={{pathname: '/connexion'}}/>
      )
    )}/>
  )

  return (
    <Router>
    <Route exact path="/" component={Home}/>
    <Route exact path="/categories" component={Categories}/>
    <Route exact path="/interCat/:id" component={InterCat}/>

    <Route exact path="/subCat/:idInter/:idCat" component={Subcat}/>
    
    <Route exact path="/admin" component={HomeAdmin}/>
    <Route exact path="/admin/recipes" component={SectionRecipes}/>
    <Route exact path="/admin/allUsers" component={SectionUsers}/>

    <Route exact path="/connexion" component={Connexion}/>
   
    <Route exact path="/recipe/:id" component={OneRecipePage}/>
    <AuthRoute exact path="/user/:id" component={Profile}/>
    <Route exact path="/comment" component={Comment} />
    <Route exact path="/sign-up" component={CreateProfile}/>
    <Route exact path="/recipes-page" component={RecipesPage}/>
    <Route exact path="/createrecipe" component={CreateRecipe}/>

    </Router>
  );
}

export default App;
