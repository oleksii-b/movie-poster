import reducer, {initialState} from './movieReducer';
import * as types from '../actionTypes';


describe('Movie reducer', () => {
  it('SET_MOVIES_PER_PAGE', () => {
    const action = {
      type: types.SET_MOVIES_PER_PAGE
    };

    expect(reducer(initialState, action)).toEqual({
      ...initialState,
      itemsPerPage: action.payload
    });
  });

  it('LOAD_MOVIES_START', () => {
    const prevStateWithError = {
      ...initialState,
      errorMsg: ''
    };

    const action = {
      type: types.LOAD_MOVIES_START
    };

    expect(reducer(prevStateWithError, action)).toEqual({
      ...initialState,
      isLoading: true,
      errorMsg: null
    });

    expect(reducer(initialState, action)).toEqual({
      ...initialState,
      isLoading: true,
      errorMsg: null
    });
  });

  it('LOAD_MOVIES_SUCCESS', () => {
    const prevState = {
      ...initialState,
      isLoading: true
    };

    const action = {
      type: types.LOAD_MOVIES_SUCCESS,
      payload: []
    };

    expect(reducer(prevState, action)).toEqual({
      ...prevState,
      items: action.payload,
      isLoading: false
    });
  });

  it('LOAD_MOVIES_ERROR', () => {
    const prevState = {
      ...initialState,
      isLoading: true
    };

    const action = {
      type: types.LOAD_MOVIES_ERROR,
      payload: ''
    };

    expect(reducer(prevState, action)).toEqual({
      ...prevState,
      errorMsg: action.payload,
      isLoading: false
    });
  });
});