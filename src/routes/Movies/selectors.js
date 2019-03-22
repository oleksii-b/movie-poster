import {createSelector} from 'reselect';


export const itemSelector = createSelector(
  ({movieList}) => movieList,
  ({filters}) => filters,
  (movieList, filters) => {
    return movieList.filter((movie) => {
      for (let filter of filters) {
        if (movie.genre === filter) {
          return true;
        }
      }

      return false;
    });
  }
)
