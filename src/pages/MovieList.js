import React, {Fragment, Component} from 'react';
import {Spring} from 'react-spring';

import Filter from 'components/Filter';
import MovieList from 'components/MovieList';
import {api} from 'API';
import styles from './MovieListPage.less';


export default class MovieListPage extends Component {
  state = {
    filters: [],
    movies: []
  }

  componentWillMount = () => {
    const movieCategory = this.props.match.params.category;

    if (typeof movieCategory === 'undefined') {
      this.props.history.push('/movies/upcoming');
    }

    this.getMoviesByFilter(movieCategory);
  }

  componentWillReceiveProps = (nextProps) => {
    this.getMoviesByFilter(nextProps.match.params.category);
    this.setState({
      filters: []
    });
  }

  getMoviesByFilter = async (nextFilter) => {
    const movies = await api.getMovies(nextFilter);

    this.setState({
      movies
    });
  }

  setFilters = (filters) => {
    this.setState({
      filters
    });
  }

  render = () => {
    let {movies, filters} = this.state;

    if (filters.length) {
      movies = movies.filter((movie) => {
        for (let filter of filters) {
          if (movie.genre === filter) {
            return true;
          }
        }

        return false;
      });
    }

    return (
      <Fragment>
        <div className={styles['filters']}>
          <Filter
            setFilters={this.setFilters}
          />
        </div>

        <MovieList
          movies={movies}
        />
      </Fragment>
    );
  }
}
