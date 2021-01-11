import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import {
  recipesReducer,
  postRecipeReducer,
  recipeCommentReducer,
  recipeCookedReducer,
  recipeReducer,
  recipeAuthorEditReducer,
} from './reducers/recipesReducer';
import {
  userLoginReducer,
  userRegisterReducer,
  userSavedReducer,
  userGetReducer,
  userPutProfileReducer,
} from './reducers/userReducers';
import {
  usersListReducer,
  unapprovedRecipesReducer,
  editRecipeReducer,
} from './reducers/adminReducers';

const combinedReducers = combineReducers({
  recipes: recipesReducer,
  recipe: recipeReducer, //SINGLE RECIPE
  postRecipe: postRecipeReducer, //Send a new recipe
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  userSaved: userSavedReducer,
  userProfile: userGetReducer,
  userUpdateProfile: userPutProfileReducer,
  recipeComment: recipeCommentReducer,
  recipeCooked: recipeCookedReducer,
  usersList: usersListReducer,
  unapprovedRecipes: unapprovedRecipesReducer,
  editedRecipes: editRecipeReducer,
  recipeAuthorUpdate: recipeAuthorEditReducer,
});

const userInfoFromStorage = localStorage.getItem('loggedUser')
  ? JSON.parse(localStorage.getItem('loggedUser'))
  : null;

const initialState = {
  userLogin: { loggedUser: userInfoFromStorage },
};

const middleware = [thunk];
const store = createStore(
  combinedReducers,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
