import axios from 'axios';

export const login = (email, password) => async (dispatch) => {
  try {
    dispatch({
      type: 'USER_LOGIN_REQUEST',
    });
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const { data } = await axios.post(
      '/api/users/login',
      { email, password },
      config
    );
    dispatch({
      type: 'USER_LOGIN_SUCCESS',
      payload: data,
    });
    localStorage.setItem('userInfo', JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: 'USER_LOGIN_FAIL',
      payload: 'אימייל או סיסמה לא תקינים',
    });
  }
};

export const logout = () => async (dispatch) => {
  dispatch({
    type: 'USER_LOGOUT',
  });
  localStorage.removeItem('userInfo');
};

export const register = (name, email, password) => async (dispatch) => {
  try {
    dispatch({
      type: 'USER_REGISTER_REQUEST',
    });
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    const { data } = await axios.post(
      '/api/users',
      { name, email, password },
      config
    );
    dispatch({
      type: 'USER_REGISTER_SUCCESS',
      payload: data,
    });
    dispatch({
      type: 'USER_LOGIN_SUCCESS',
      payload: data,
    });
    localStorage.setItem('userInfo', JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: 'USER_REGISTER_FAIL',
      payload: error.response.data.message,
    });
  }
};

export const saveRecipe = (userInfo, recipeId, savedRecipes) => async (
  dispatch
) => {
  try {
    dispatch({
      type: 'USER_SAVE_RECIPE_REQUEST',
    });
    const config = {
      headers: {
        'Contet-Type': 'appliaction/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    const { data } = await axios.put(
      `/api/users/liked/${userInfo._id}`,
      {
        userId: userInfo._id,
        recipeId: recipeId,
        savedRecipes: savedRecipes,
      },
      config
    );
    dispatch({
      type: 'USER_SAVE_RECIPE_SUCCESS',
      payload: data,
    });

    const currentUserInfo = JSON.parse(localStorage.getItem('userInfo'));
    const newUserInfo = {
      ...currentUserInfo,
      savedRecipes: savedRecipes,
    };
    localStorage.setItem('userInfo', JSON.stringify(newUserInfo));
  } catch (error) {
    dispatch({
      type: 'USER_SAVE_RECIPE_FAIL',
      payload: error.response.data.message,
    });
  }
};

export const getUser = (userId) => async (dispatch) => {
  try {
    dispatch({
      type: 'USER_DETAILS_REQUEST',
    });
    const { data } = await axios.get(`/api/users/${userId}`);

    dispatch({
      type: 'USER_DETAILS_SUCCESS',
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: 'USER_DETAILS_FAIL',
      payload: error.response.data.message,
    });
  }
};

export const getLoggedUserProfile = (user) => async (dispatch) => {
  try {
    dispatch({
      type: 'USER_DETAILS_REQUEST',
    });
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${user.token}`,
      },
    };
    const { data } = await axios.get(`/api/users/profile`, config);
    dispatch({
      type: 'USER_DETAILS_SUCCESS',
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: 'USER_DETAILS_FAIL',
      payload: error,
    });
  }
};

export const updateUser = (userInfo, details) => async (dispatch) => {
  try {
    dispatch({
      type: 'USER_DETAILS_UPDATE_REQUEST',
    });
    const config = {
      headers: {
        'Contet-Type': 'appliaction/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.put(`/api/users/profile`, details, config);

    dispatch({
      type: 'USER_DETAILS_UPDATE_SUCCESS',
      payload: data,
    });

    localStorage.setItem('userInfo', JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: 'USER_DETAILS_UPDATE_FAIL',
      payload: error.response.data.message,
    });
  }
};
