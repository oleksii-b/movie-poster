import {default as API} from 'utils/API';
import * as types from '../actionTypes';


const loadMoviesStart = () => {
  return {
    type: types.LOAD_MOVIES_START
  }
};


const loadMoviesSuccess = (movies) => {
  return {
    type: types.LOAD_MOVIES_SUCCESS,
    payload: movies
  }
};

const loadMoviesError = (error) => {
  return {
    type: types.LOAD_MOVIES_ERROR,
    payload: error,
  }
};

export const loadMovies = (filter) => {
  return async function (dispatch) {
    dispatch(loadMoviesStart());

    const movies = await API.getMovies(filter);

    if (movies.error) {
      dispatch(loadMoviesError(movies.error.message));
    } else {
      dispatch(loadMoviesSuccess(movies));
    }
  }
};
