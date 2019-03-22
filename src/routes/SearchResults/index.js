import React, {Component} from 'react';
import {connect} from 'react-redux';

import {loadMovies} from 'store/actions/loadMovies';
import {MOVIES_PER_PAGE_DEFAULT} from 'utils/config';
import searchResults from './searchResults';


class SearchResults extends Component {
  state = {
    movies: [],
    moviesPerPage: MOVIES_PER_PAGE_DEFAULT
  }

  setMovieList = async (query = '', movieList = []) => {
    const allMovies = movieList;

    let filteredMovies = [];
    let mappedMovies = {};
    let movies = [];

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
  }

  componentWillMount = () => {
    this.props.loadMovies();
  }

  componentWillReceiveProps = (nextProps) => {
    if (nextProps.movies.length) {
      const searchQuery = decodeURI(new URLSearchParams(nextProps.location.search).get('q'));

      this.setMovieList(searchQuery, nextProps.movies);

      if (nextProps.moviesPerPage !== this.props.moviesPerPage) {
        this.setState({
          moviesPerPage: nextProps.moviesPerPage
        });
      }
    }
  }

  render = () => {
    return searchResults({
      movieList: this.state.movies,
      moviesPerPage: this.state.moviesPerPage,
      queryString: new URLSearchParams(this.props.location.search).get('q')
    });
  }
}

function mapStateToProps(state) {
  return {
    movies: state.movies.items,
    moviesPerPage: state.movies.itemsPerPage
  }
}


function mapDispatchToProps(dispatch) {
  return {
    loadMovies: (filter) => dispatch(loadMovies(filter))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchResults);
