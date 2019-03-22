import {setMoviesPerPage} from './filterMovies';
import * as types from '../actionTypes';


describe('Actions: filter movies', () => {
  it('setMoviesPerPage()', () => {
    const action = {
      type: types.SET_MOVIES_PER_PAGE,
      payload: '10'
    };

    expect(setMoviesPerPage('10')).toEqual(action);
  });
});
