import React from 'react';
import { GlobalStyles } from './GlobalStyles';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Nav from './Common/Nav';
import Footer from './Common/Footer';
import Home from './Home';
import SingleRecipe from './SingleRecipe';
import NewRecipe from './NewRecipe';
import Login from './Login';
import Register from './Register';
import Profile from './LoggedUserProfile';
import User from './UserProfile';
import WhatsNew from './WhatsNew';
import Suggestions from './Suggestions';
import UserList from './Admin/UserList';
import EditRecipes from './Admin/EditRecipes';
import MainAdminScreen from './Admin/MainAdminScreen';
import TestUI from './Tester/TestUI';

function App() {
  return (
    <div>
      <BrowserRouter>
        <GlobalStyles />
        <Nav />
        <Switch>
          <Route path='/' exact component={Home} />
          <Route path='/page/:pageNumber' exact component={Home} />
          <Route path='/search/:keyword' exact component={Home} />
          <Route
            path='/search/:keyword/page/:pageNumber'
            exact
            component={Home}
          />
          <Route path='/search/:keyword/tags/:tag' exact component={Home} />
          <Route
            path='/search/:keyword/tags/:tag/page/:pageNumber'
            exact
            component={Home}
          />

          <Route path='/tags/:tag' exact component={Home} />
          <Route path='/tags/:tag/page/:pageNumber' exact component={Home} />

          <Route path='/categories/:category' exact component={Home} />
          <Route
            path='/categories/:category/page/:pageNumber'
            exact
            component={Home}
          />

          <Route
            path='/categories/:category/search/:keyword'
            exact
            component={Home}
          />
          <Route
            path='/categories/:category/search/:keyword/tags/:tag'
            exact
            component={Home}
          />
          <Route
            path='/categories/:category/search/:keyword/tags/:tag/page/:pageNumber'
            exact
            component={Home}
          />
          <Route
            path='/categories/:category/tags/:tag/page/:pageNumber'
            exact
            component={Home}
          />
          <Route
            path='/categories/:category/tags/:tag'
            exact
            component={Home}
          />

          <Route
            path='/search/:keyword/tags/:tag/page/:pageNumber'
            exact
            component={Home}
          />
          <Route
            path='/categories/:category/search/:keyword/tags/:tag/page/:pageNumber'
            component={Home}
          />
          <Route
            path='/categories/:category/tags/:tag'
            exact
            component={Home}
          />
          <Route
            path='/categories/:category/search/:keyword'
            component={Home}
            exact
          />
          <Route
            path='/categories/:category/search/:keyword/tags/:tag'
            component={Home}
            exact
          />
          <Route path='/recipes/:id' component={SingleRecipe} />
          <Route path='/new-recipe' exact component={NewRecipe} />
          <Route path='/whatsnew' exact component={WhatsNew} />
          <Route path='/suggestions' exact component={Suggestions} />
          <Route path='/login' component={Login} />
          <Route path='/register' component={Register} />
          <Route path='/profile' component={Profile} />
          <Route path='/users/:id' component={User} />
          <Route path='/admin' exact component={MainAdminScreen} />
          <Route path='/admin/users' component={UserList} />
          <Route path='/admin/recipes' component={EditRecipes} />
          <Route path='/test' component={TestUI} />
        </Switch>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
