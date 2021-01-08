export const usersListReducer = (state = { users: [] }, action) => {
  switch (action.type) {
    case 'USERS_LIST_REQUEST':
      return { ...state, isLoading: true };
    case 'USERS_LIST_SUCCESS':
      return {
        ...state,
        isLoading: false,
        succes: true,
        users: action.payload,
      };
    case 'USERS_LIST_FAIL':
      return { ...state, isLoading: false, error: action.payload };
    default:
      return state;
  }
};

export const unapprovedRecipesReducer = (
  state = { newRecipes: [] },
  action
) => {
  switch (action.type) {
    case 'UNAPPROVED_RECIPES_REQUEST':
      return { ...state, isLoading: true };
    case 'UNAPPROVED_RECIPES_SUCCESS':
      return {
        ...state,
        isLoading: false,
        succes: true,
        newRecipes: action.payload,
      };
    case 'UNAPPROVED_RECIPES_FAIL':
      return { ...state, isLoading: false, error: action.payload };
    default:
      return state;
  }
};

export const editRecipeReducer = (state = {}, action) => {
  switch (action.type) {
    case 'APPROVE_RECIPE_REQUEST':
      return { ...state, isLoading: true };
    case 'APPROVE_RECIPE_SUCCESS':
      return {
        ...state,
        isLoading: false,
        success: true,
        approved: action.payload,
      };
    case 'APPROVE_RECIPE_FAIL':
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    case 'DELETE_RECIPE_REQUEST':
      return { ...state, isLoading: true };
    case 'DELETE_RECIPE_SUCCESS':
      return {
        ...state,
        isLoading: false,
        success: true,
        deleted: action.payload,
      };
    case 'DELETE_RECIPE_FAIL':
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    case 'EDIT_RECIPE_RESET':
      return {};
    default:
      return state;
  }
};
