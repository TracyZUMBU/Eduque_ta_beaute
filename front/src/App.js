import React from 'react';

import './css/style.css';

import {BrowserRouter as Router, Route} from 'react-router-dom'
import Home from './pages/Home'
import Categories from './pages/Recettes/Categories';
import InterCat from './pages/Recettes/InterCat';
import Subcat from './pages/Recettes/SubCat';
import Connexion from './pages/espaceUser/Connexion';
import Recipes from './components/AllRecipes';
import Profile from './pages/espaceUser/Profile';
import EspaceAdmin from './pages/espaceAdmin/HomeAdmin';
import SectionRecipes from './pages/espaceAdmin/SectionRecipes';
import SectionUsers from './pages/espaceAdmin/SectionUsers'
import Comment from './components/Comment'
import CreateProfile from './pages/espaceUser/CreateProfile';
import Secret from './pages/espaceUser/Secret'
import RecipesPage from './pages/espaceUser/RecipesPage';

function App() {
  return (
    <Router>

    <div className="">
   
    </div>
    <Route exact path="/home" component={Home}/>
    <Route exact path="/categories" component={Categories}/>
    <Route exact path="/interCat/:id" component={InterCat}/>

    <Route exact path="/subCat/:idInter/:idCat" component={Subcat}/>
    
    <Route exact path="/admin" component={EspaceAdmin}/>
    <Route exact path="/admin/recipes" component={SectionRecipes}/>
    <Route exact path="/admin/allUsers" component={SectionUsers}/>

    <Route exact path="/connexion" component={Connexion}/>
    <Route exact path="/recipes/:id" component={Recipes}/>
    <Route exact path="/user/:id" component={Profile}/>
    <Route exact path="/comment" component={Comment}/>
    <Route exact path="/sign-up" component={CreateProfile}/>
    <Route exact path="/secret-route" component={Secret}/>
    <Route exact path="/recipes-page" component={RecipesPage}/>

    </Router>
  );
}

export default App;
