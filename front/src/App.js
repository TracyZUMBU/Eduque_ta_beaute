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
    <Route exact path="/admin/recipes" component={SectionRecipes}/>
    <Route exact path="/recipelist" component={RecipeList}/>
    <Route exact path="/connexion" component={Connexion}/>
    <Route exact path="/recipes/:id" component={Recipes}/>
    <Route exact path="/user/:id" component={Profile}/>
    

    </Router>
  );
}

export default App;
