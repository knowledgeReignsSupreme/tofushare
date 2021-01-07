const initialState = {
  isLoading: false,
  recipes: [],
};

export const recipesReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'RECIPES_GET_REQUEST':
      return {
        ...state,
        isLoading: true,
        recipes: [],
      };
    case 'RECIPES_GET_SUCCESS':
      return {
        ...state,
        isLoading: false,
        recipes: action.payload.recipes,
        pages: action.payload.pages,
        page: action.payload.page,
      };
    case 'RECIPES_GET_FAIL':
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const recipeReducer = (
  state = { isLoading: false, currentRecipe: {} },
  action
) => {
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

export const postRecipeReducer = (state = {}, action) => {
  switch (action.type) {
    case 'RECIPE_POST_REQUEST':
      return {
        ...state,
        isLoading: true,
      };
    case 'RECIPE_POST_SUCCESS':
      return {
        ...state,
        isLoading: false,
        postedRecipe: action.payload,
        success: true,
      };
    case 'RECIPE_POST_FAIL':
      return {
        ...state,
        isLoading: false,
        error: 'אופס. נתקלנו בבעיה, יש לנסות שוב',
      };
    default:
      return state;
  }
};

export const recipeCommentReducer = (state = {}, action) => {
  switch (action.type) {
    case 'RECIPE_CREATE_COMMENT_REQUEST':
      return {
        ...state,
        isLoading: true,
        comment: {},
      };
    case 'RECIPE_CREATE_COMMENT_SUCCESS':
      return {
        ...state,
        isLoading: false,
        success: true,
        comment: action.payload,
      };
    case 'RECIPE_CREATE_COMMENT_FAIL':
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    case 'RECIPE_CREATE_COMMENT_RESET':
      return {};
    default:
      return state;
  }
};

export const recipeCookedReducer = (state = {}, action) => {
  switch (action.type) {
    case 'RECIPE_COOKED_REQUEST':
      return {
        ...state,
        isLoading: true,
      };
    case 'RECIPE_COOKED_SUCCESS':
      return {
        ...state,
        isLoading: false,
        success: true,
      };
    case 'RECIPE_COOKED_FAIL':
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    case 'RECIPE_COOKED_RESET':
      return {};
    default:
      return state;
  }
};
