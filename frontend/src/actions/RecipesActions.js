import axios from 'axios';

export const getRecipes = (
  category = '',
  keyword = '',
  searchTag = '',
  pageNumber = ''
) => async (dispatch) => {
  try {
    dispatch({ type: 'RECIPES_GET_REQUEST' });
    const { data } = await axios.get(
      `/api/recipes?category=${category}&keyword=${keyword}&searchTag=${searchTag}&pageNumber=${pageNumber}`
    );
    dispatch({ type: 'RECIPES_GET_SUCCESS', payload: data });
  } catch (error) {
    dispatch({
      type: 'RECIPES_GET_FAIL',
      payload: error.response.data.message,
    });
  }
};

export const getSingleRecipe = (id) => async (dispatch) => {
  try {
    dispatch({ type: 'RECIPE_GET_REQUEST' });
    const { data } = await axios.get(`/api/recipes/${id}`);
    dispatch({ type: 'RECIPE_GET_SUCCESS', payload: data });
  } catch (error) {
    dispatch({
      type: 'RECIPE_GET_FAIL',
      payload: error.response.data.message,
    });
  }
};

export const postRecipe = (recipe, userToken) => async (dispatch) => {
  try {
    dispatch({ type: 'RECIPE_POST_REQUEST' });

    const config = {
      headers: {
        'Contet-Type': 'appliaction/json',
        Authorization: `Bearer ${userToken}`,
      },
    };

    const { data } = await axios.post(
      `/api/recipes`,
      {
        title: recipe.title,
        description: recipe.description,
        author: recipe.author,
        website: recipe.website,
        category: recipe.category,
        ingredients: recipe.ingredients,
        instructions: recipe.instructions,
        images: recipe.images,
        prepTime: recipe.prepTime,
        cookingTime: recipe.cookingTime,
        difficulty: recipe.difficulty,
        tags: recipe.tags,
        remarks: recipe.remarks,
        dishesAmmount: recipe.dishesAmmount,
        createdBy: recipe.createdBy,
      },
      config
    );

    dispatch({ type: 'RECIPE_POST_SUCCESS', payload: data });
  } catch (error) {
    dispatch({
      type: 'RECIPE_POST_FAIL',
      payload: error.response.data.message,
    });
  }
};

export const createComment = (token, recipeId, comment) => async (dispatch) => {
  try {
    dispatch({ type: 'RECIPE_CREATE_COMMENT_REQUEST' });

    const config = {
      headers: {
        'Contet-Type': 'appliaction/json',
        Authorization: `Bearer ${token}`,
      },
    };

    const details = {
      comment: comment,
      recipeId: recipeId,
    };

    const { data } = await axios.put(
      `/api/recipes/${recipeId}`,
      details,
      config
    );

    dispatch({ type: 'RECIPE_CREATE_COMMENT_SUCCESS', payload: data });
  } catch (error) {
    dispatch({
      type: 'RECIPE_CREATE_COMMENT_FAIL',
      payload: error,
    });
  }
};

export const cookedRecipe = (user, recipeId, cooked) => async (dispatch) => {
  try {
    dispatch({ type: 'RECIPE_COOKED_REQUEST' });

    const config = {
      headers: {
        'Contet-Type': 'appliaction/json',
        Authorization: `Bearer ${user.token}`,
      },
    };

    const details = {
      cookedBy: cooked,
    };

    await axios.put(`/api/recipes/${recipeId}`, details, config);

    dispatch({ type: 'RECIPE_COOKED_SUCCESS' });
  } catch (error) {
    dispatch({
      type: 'RECIPE_COOKED_FAIL',
      payload: error.response.data.message,
    });
  }
};

export const editRecipe = (user, editedInfo) => async (dispatch) => {
  //TODO: In the future, add the possibilty to edit the whole recipe.
  try {
    dispatch({ type: 'RECIPE_AUTHOR_EDIT_REQUEST' });
    const config = {
      headers: {
        'Contet-Type': 'appliaction/json',
        Authorization: `Bearer ${user.token}`,
      },
    };

    await axios.put(`/api/recipes/author`, editedInfo, config);
    dispatch({ type: 'RECIPE_AUTHOR_EDIT_SUCCESS' });
  } catch (error) {
    dispatch({
      type: 'RECIPE_AUTHOR_EDIT_FAIL',
      payload: error.response.data.message,
    });
  }
};
