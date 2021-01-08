import React from 'react';
import { GlobalStyles } from './GlobalStyles';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Nav from './components/Nav';
import Footer from './components/Footer';
import Home from './pages/Home';
import SingleRecipe from './pages/SingleRecipe';
import NewRecipe from './pages/NewRecipe';
import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/Profile';
import User from './pages/User';
import WhatsNew from './pages/WhatsNew';
import Suggestions from './pages/Suggestions';
import UserList from './pages/Admin/UserList';
import UnapprovedRecipes from './pages/Admin/UnapprovedRecipes';

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
          <Route path='/admin/users' component={UserList} />
          <Route path='/admin/recipes' component={UnapprovedRecipes} />
        </Switch>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
