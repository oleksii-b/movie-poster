import React, {Fragment} from 'react';

import MovieList from 'components/MovieList';
import classes from './SearchResults.less';


export default function searchMovies(props) {
  const {queryString, movieList, moviesPerPage} = props;

  return (
    <Fragment>
      <h3 className='text-center'>
        <small>Результаты поиска по запросу:</small> {queryString}
      </h3>

      <hr className={classes.devider} />

      <MovieList
        movies={movieList}
        moviesPerPage={moviesPerPage}
      />
    </Fragment>
  );
}
