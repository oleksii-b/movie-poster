import React, {Component} from 'react';
import {Spring} from 'react-spring';

import Filter from 'components/Filter';
import MovieList from 'components/MovieList';
import {api} from 'API';


export default class SearchMoviesPage extends Component {
  state = {
    movies: []
  }

  setMovieList = (query = '') => {
    api.fetchAllMovies((allMovies) => {
      let filteredMovies = [],
        mappedMovies = {},
        movies = [];

      if (query) {
        filteredMovies = allMovies.filter((movie) => {
          return (movie.title.toLowerCase()).match(query.toLowerCase());
        });
      } else {
        filteredMovies = [...allMovies];
      }

      for (let movie of filteredMovies) {
        mappedMovies[movie.title] = {...movie};
      }

      for (let movieTitle in mappedMovies) {
        movies.push(mappedMovies[movieTitle]);
      }

      this.setState({
        movies
      });
    })
  }

  componentWillMount = () => {
    this.setMovieList(new URLSearchParams(this.props.location.search).get('q'));
  }

  componentWillReceiveProps = (nextProps) => {
    this.setMovieList(new URLSearchParams(nextProps.location.search).get('q'));
  }

  render = () => {
    return (
      <MovieList
        movies={this.state.movies}
      />
    );
  }
}
