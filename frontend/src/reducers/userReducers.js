export const userLoginReducer = (state = {}, action) => {
  switch (action.type) {
    case 'USER_LOGIN_REQUEST':
      return { isLoading: true };
    case 'USER_LOGIN_SUCCESS':
      return { isLoading: false, loggedUser: action.payload };
    case 'USER_LOGIN_FAIL':
      return { isLoading: false, error: action.payload };
    case 'LOGGED_USER_PROFILE_REQUEST':
      return { ...state, isLoading: true };
    case 'LOGGED_USER_PROFILE_SUCCESS':
      return {
        ...state,
        isLoading: false,
        success: true,
        loggedUser: action.payload,
      };
    case 'LOGGED_USER_PROFILE_FAIL':
      return { ...state, isLoading: false, error: action.payload };
    case 'USER_LOGOUT':
      return {};
    default:
      return state;
  }
};

export const userRegisterReducer = (state = {}, action) => {
  switch (action.type) {
    case 'USER_REGISTER_REQUEST':
      return { isLoading: true };
    case 'USER_REGISTER_SUCCESS':
      return { isLoading: false, loggedUser: action.payload };
    case 'USER_REGISTER_FAIL':
      return { isLoading: false, error: action.payload };
    case 'USER_UPDATE_REQUEST':
      return { isLoading: true, loggedUser: action.payload };
    default:
      return state;
  }
};

export const userSavedReducer = (state = {}, action) => {
  switch (action.type) {
    case 'USER_SAVE_RECIPE_REQUEST':
      return { ...state, isLoading: true };
    case 'USER_SAVE_RECIPE_SUCCESS':
      return {
        ...state,
        isLoading: false,
        saved: action.payload,
        success: true,
      };
    case 'USER_SAVE_RECIPE_FAIL':
      return { ...state, isLoading: false, error: action.payload };
    case 'USER_SAVE_RECIPE_RESET':
      return {};
    default:
      return state;
  }
};

export const userGetReducer = (state = {}, action) => {
  switch (action.type) {
    case 'USER_DETAILS_REQUEST':
      return { ...state, isLoading: true };

    case 'USER_DETAILS_SUCCESS':
      return {
        ...state,
        userData: action.payload,
        isLoading: false,
      };

    case 'USER_DETAILS_FAIL':
      return { ...state, isLoading: false, error: action.payload };
    default:
      return state;
  }
};

export const userPutProfileReducer = (state = {}, action) => {
  switch (action.type) {
    case 'USER_DETAILS_UPDATE_REQUEST':
      return { ...state, isLoading: true };

    case 'USER_DETAILS_UPDATE_SUCCESS':
      return {
        ...state,
        updatedData: action.payload,
        isLoading: false,
        success: true,
      };
    case 'USER_DETAILS_UPDATE_RESET':
      return {};
    case 'USER_DETAILS_UPDATE_FAIL':
      return { ...state, isLoading: false, error: action.payload };
    default:
      return state;
  }
};
