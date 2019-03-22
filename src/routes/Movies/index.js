import React, {PureComponent} from 'react';
import {connect} from 'react-redux';

import {loadMovies} from 'store/actions/loadMovies';
import {MOVIES_PER_PAGE_DEFAULT, CATEGORIES} from 'utils/config';
import {itemSelector} from './selectors';
import movies from './movies';


class Movies extends PureComponent {
  state = {
    filters: [],
    movieList: [],
    moviesPerPage: MOVIES_PER_PAGE_DEFAULT
  }

  componentWillMount = () => {
    const movieCategory = this.props.match.params.category;

    if (movieCategory === void(0)) {
      this.props.history.push('/movies/' + CATEGORIES[0]);
    }

    this.props.loadMovies(movieCategory);
  }

  componentWillReceiveProps = (nextProps) => {
    this.setState({
      filters: []
    });

    if (nextProps.match.params.category !== this.props.match.params.category) {
      this.props.loadMovies(nextProps.match.params.category);
    }

    if (JSON.stringify(nextProps.movies) !== JSON.stringify(this.props.movies)) {
      this.setState({
        movieList: nextProps.movies
      });
    }

    if (nextProps.moviesPerPage !== this.props.moviesPerPage) {
      this.setState({
        moviesPerPage: nextProps.moviesPerPage
      });
    }
  }

  setFilters = (filters) => {
    this.setState({
      filters
    });
  }

  render = () => {
    let {movieList, filters} = this.state;

    if (filters.length) {
      movieList = itemSelector(this.state);
    }

    return movies({
      setFilters: this.setFilters,
      isLoading: this.props.isLoading,
      movieList,
      moviesPerPage: this.state.moviesPerPage
    });
  }
}

function mapStateToProps(state) {
  return {
    movies: state.movies.items,
    isLoading: state.movies.isLoading,
    moviesPerPage: state.movies.itemsPerPage
  }
}

function mapDispatchToProps(dispatch) {
  return {
    loadMovies: (filter) => dispatch(loadMovies(filter))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Movies);
