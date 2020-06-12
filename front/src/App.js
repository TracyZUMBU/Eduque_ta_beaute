import React from 'react';

import {BrowserRouter as Router, Route} from 'react-router-dom'
import Home from './pages/Home'
import Categories from './pages/Recettes/Categories';
import InterCat from './pages/Recettes/InterCat';
import Subcat from './pages/Recettes/SubCat';
import RecipeList from './pages/Recettes/RecipeList';
import Connexion from './pages/espaceUser/Connexion';
import Recipes from './components/Recipes';
import Profile from './pages/espaceUser/Profile';
import EspaceAdmin from './pages/espaceAdmin/HomeAdmin';
import SectionRecipes from './pages/espaceAdmin/SectionRecipes';
import SectionUsers from './pages/espaceAdmin/SectionUsers'
import CreateArticle from './pages/espaceAdmin/CreateArticle';
import CreateProfile from './pages/espaceUser/CreateProfile';

function App() {
  return (
    <Router>

    <div className="App">
   
    </div>
    <Route exact path="/home" component={Home}/>
    <Route exact path="/categories" component={Categories}/>
    <Route exact path="/interCat/:id" component={InterCat}/>

    <Route exact path="/subCat/:idInter/:idCat" component={Subcat}/>
    
    <Route exact path="/admin" component={EspaceAdmin}/>
    <Route exact path="/admin/allRecipes/:view" component={SectionRecipes}/>
    <Route exact path="/admin/allUsers" component={SectionUsers}/>

    <Route exact path="/login" component={Connexion}/>
    <Route exact path="/recipes/:id" component={Recipes}/>
    <Route exact path="/user/:id" component={Profile}/>
    <Route exact path="/createArticle" component={CreateArticle}/>
    <Route exact path="/createProfile" component={CreateProfile}/>

    </Router>
  );
}

export default App;
