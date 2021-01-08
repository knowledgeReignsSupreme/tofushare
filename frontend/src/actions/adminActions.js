import axios from 'axios';

export const listUsers = (user) => async (dispatch) => {
  try {
    dispatch({
      type: 'USERS_LIST_REQUEST',
    });
    const config = {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    };
    const { data } = await axios.get(`/api/users`, config);

    dispatch({
      type: 'USERS_LIST_SUCCESS',
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: 'USERS_LIST_FAIL',
      payload: error.response.data.message,
    });
  }
};

export const listRecipes = (user) => async (dispatch) => {
  try {
    dispatch({
      type: 'UNAPPROVED_RECIPES_REQUEST',
    });
    const config = {
      headers: {
        'Contet-Type': 'appliaction/json',
        Authorization: `Bearer ${user.token}`,
      },
    };
    const { data } = await axios.get(`/api/recipes/unapproved`, config);
    dispatch({
      type: 'UNAPPROVED_RECIPES_SUCCESS',
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: 'UNAPPROVED_RECIPES_FAIL',
      payload: error.response.data.message,
    });
  }
};

export const approveRecipe = (user, recipeId) => async (dispatch) => {
  try {
    dispatch({
      type: 'APPROVE_RECIPE_REQUEST',
    });

    const { data } = await axios({
      method: 'put',
      url: `/api/recipes/approve/${recipeId}`,
      headers: {
        'Contet-Type': 'application/x-www-form-urlencoded',
        Authorization: `Bearer ${user.token}`,
      },
    });
    dispatch({
      type: 'APPROVE_RECIPE_SUCCESS',
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: 'APPROVE_RECIPE_FAIL',
      payload: error.response.data.message,
    });
  }
};

export const deleteRecipe = (user, recipeId) => async (dispatch) => {
  try {
    dispatch({
      type: 'DELETE_RECIPE_REQUEST',
    });

    const { data } = await axios({
      method: 'put',
      url: `/api/recipes/delete/${recipeId}`,
      headers: {
        'Contet-Type': 'application/x-www-form-urlencoded',
        Authorization: `Bearer ${user.token}`,
      },
    });
    dispatch({
      type: 'DELETE_RECIPE_SUCCESS',
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: 'DELETE_RECIPE_FAIL',
      payload: error.response.data.message,
    });
  }
};
