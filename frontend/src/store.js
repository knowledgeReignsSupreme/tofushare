import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import {
  recipesReducer,
  postRecipeReducer,
  recipeCommentReducer,
  recipeCookedReducer,
} from './reducers/recipesReducer';
import recipeReducer from './reducers/recipeReducer';
import {
  userLoginReducer,
  userRegisterReducer,
  userSavedReducer,
  userGetReducer,
  userPutProfileReducer,
} from './reducers/userReducers';

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
});

const userInfoFromStorage = localStorage.getItem('userInfo')
  ? JSON.parse(localStorage.getItem('userInfo'))
  : null;

const initialState = {
  userLogin: { userInfo: userInfoFromStorage },
};

const middleware = [thunk];
const store = createStore(
  combinedReducers,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
