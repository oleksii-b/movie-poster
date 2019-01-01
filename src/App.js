import React, {Component, Fragment} from 'react';
import {Redirect, Route, Switch} from 'react-router-dom';

import Header from './components/Header';
import MovieListPage from './pages/MovieList';
import SearchMoviesPage from './pages/SearchMovies';
import NotFoundPage from './pages/NotFound';


export default class App extends Component {
  render = () => {
    return (
      <div className='app'>
        <Route
          path='/'
          component={Header}
        />

        <main className='main-content container'>
        {
          (location.pathname.substr(1)).match(/^movie-poster/)
          ?
            <Switch>
              <Redirect
                exact
                from='/'
                to='/search'
              />

              <Route
                exact
                path='/search'
                component={SearchMoviesPage}
              />

              <Route
                path='/movies/:category?'
                component={MovieListPage}
              />

              <Route
                component={NotFoundPage}
              />
            </Switch>
          :
            <NotFoundPage />
        }
        </main>
      </div>
    );
  }
}
