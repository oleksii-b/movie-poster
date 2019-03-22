import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import fetchMock from 'fetch-mock';
import expect from 'expect';

import {loadMovies} from './loadMovies';
import {BASE_URI, CATEGORIES} from 'utils/config';
import * as types from '../actionTypes';


const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('Actions: load movies', () => {
  CATEGORIES.forEach((category) => {
    afterEach(() => {
      fetchMock.reset()
      fetchMock.restore()
    });

    it(`Loading ${category} movies success`, () => {
      fetchMock.getOnce(`${BASE_URI}/movies?filter=${category}`, {
        headers: {
          'content-type': 'application/json'
        },
        body: []
      });

      const actions = [
        {
          type: types.LOAD_MOVIES_START
        },
        {
          type: types.LOAD_MOVIES_SUCCESS,
          payload: []
        },
      ];

      const store = mockStore({});

      return (
        store.dispatch(loadMovies(category))
          .then(() => {
            expect(store.getActions()).toEqual(actions);
          })
      );
    });

    // it(`Loading ${category} movies error`, () => {
    //   fetchMock.catch();

    //   const action = {
    //     type: types.LOAD_MOVIES_ERROR,
    //     payload: ''
    //   };

    //   const store = mockStore({});

    //   return (
    //     store.dispatch(loadMovies(category))
    //       .catch(() => {
    //         expect(store.getActions()).toEqual(action);
    //       })
    //   );
    // });
  });
});
