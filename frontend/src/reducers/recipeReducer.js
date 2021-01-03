const initialState = {
  isLoading: false,
  currentRecipe: {},
};

const recipeReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'RECIPE_GET_REQUEST':
      return {
        ...state,
        isLoading: true,
        currentRecipe: {},
      };
    case 'RECIPE_GET_SUCCESS':
      return {
        ...state,
        isLoading: false,
        currentRecipe: action.payload,
      };
    case 'RECIPE_GET_FAIL':
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default recipeReducer;
