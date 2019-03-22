import React, {Fragment} from 'react';
import {Spring} from 'react-spring';

import Filter from 'components/Filter';
import MovieList from 'components/MovieList';
import MoviesPerPageSelect from 'components/MoviesPerPageSelect';
import classes from './Movies.less';


export default function movies(props) {
  return (
    <Fragment>
      <div className={classes.filters}>
        <div>
          <Filter
            setFilters={props.setFilters}
          />
        </div>

        <MoviesPerPageSelect />
      </div>

      <MovieList
        isLoading={props.isLoading}
        movies={props.movieList}
        moviesPerPage={props.moviesPerPage}
      />
    </Fragment>
  );
}
