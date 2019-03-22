import * as types from '../actionTypes';


export const initialState = {
  items: null,
  isLoading: false,
  errorMsg: null
};

export default function movieReducer(state = initialState, action) {
  switch (action.type) {
    case types.SET_MOVIES_PER_PAGE:
      return {
        ...state,
        itemsPerPage: action.payload
      };

    case types.LOAD_MOVIES_START:
      return {
        ...state,
        isLoading: true,
        errorMsg: null
      };

    case types.LOAD_MOVIES_SUCCESS:
      return {
        ...state,
        items: action.payload,
        isLoading: false
      };

    case types.LOAD_MOVIES_ERROR:
      return {
        ...state,
        errorMsg: action.payload,
        isLoading: false
      };

    default:
      return state;
  }
};
