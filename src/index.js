// Core
import React, { Component, Fragment } from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter} from 'react-router-dom';
import { Spring } from 'react-spring';
import Select from 'react-select';

// Theme
import 'theme/init.less';
import { getStyles } from './helpers';
import { api } from './API';
import App from './App';


function MoviesJSX(props) {
  if (!props.movies) {
    return null;
  }

  return props.movies.map((movie) => {
    return (
      <Spring
        from = {{
          opacity: 0,
        }}
        key = { movie.id }
        to = {{
          opacity: 1,
        }}
      >
        {(props) => (
          <div
            className = 'movie'
            style = { props }>
            <div className = 'poster'>
              <span className = 'genre'>{movie.genre}</span>
              <img src = { movie.poster } />
              <span className = 'rating'>{movie.rating}</span>
            </div>
            <span className = 'title'>{movie.title}</span>
          </div>
        )}
      </Spring>
    );
  });
}

const selectByGenre = (evt) => {
  console.log(evt.target.value)
}


class MoviesPoster extends Component {
  state = {
    movies: [],
    selectedFilter: 'upcoming'
  }

  componentDidMount = () => {
    this.getMoviesByFilter(this.state.selectedFilter);
  }

  getMoviesByFilter = async (nextFilter) => {
    const movies = await api.getMovies(nextFilter);

    this.setState({
      movies,
      selectedFilter: nextFilter
    });
  }

  updateMoviesByFilter = (evt) => {
    this.getMoviesByFilter(evt.currentTarget.dataset.name);
  }

  render = () => {
    const styles = getStyles({
      selectedFilter: this.state.selectedFilter
    });

    const genres = [
      'Мультфильм',
      'Фантастика',
      'Драма',
      'Боевик',
      'Криминал',
      'Триллер',
      'Фэнтези'
    ].map((genre) => {
      return {
        value: genre,
        label: genre
      }
    });

    return (
      <Fragment>
        <div className = 'header'>
          <div className = 'logo' />
          <div className = 'filters'>
            <div
              className = { styles.latestFilter }
              data-name = 'latest'
              onClick = { this.updateMoviesByFilter }>
              <span>Новинки 2018</span>
            </div>
            <div
              className = { styles.upcomingFilter }
              data-name = 'upcoming'
              onClick = { this.updateMoviesByFilter }>
              <span>Скоро в кинотеатрах</span>
            </div>
            <div
              className = { styles.popularFilter }
              data-name = 'popular'
              onClick = { this.updateMoviesByFilter }>
              <span>В топ-чартах</span>
            </div>
          </div>
        </div>
        <div>
          Фильтровать по жанрам:
          <Select
            isMulti={true}
            options={genres}
            placeholder='Выберете жанр'
          />
        </div>
        <div className = 'content'>
          <MoviesJSX movies={this.state.movies} />
        </div>
      </Fragment>
    ); 
  }
}

ReactDOM.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById('root')
);
