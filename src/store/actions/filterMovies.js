import {SET_MOVIES_PER_PAGE} from '../actionTypes';


export const setMoviesPerPage = (qty) => {
  return {
    type: SET_MOVIES_PER_PAGE,
    payload: qty
  }
};
