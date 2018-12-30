import React, {Component, Fragment} from 'react';
import {Redirect, Route, Switch} from 'react-router-dom';

import Header from './components/Header';
// import HomePage from './pages/Home';
import MovieListPage from './pages/MovieList';
import SearchMoviesPage from './pages/SearchMovies';
// import NotFoundPage from './pages/NotFound';


export default class App extends Component {
  render = () => {
    return (
      <Fragment>
        <Route
          path='/'
          component={Header}
        />

        <div className='container'>
          <Switch>
            {/* <Route
              exact
              path='/'
              component={HomePage}
            /> */}

            <Route
              exact
              path='/search'
              component={SearchMoviesPage}
            />

            <Route
              path='/movies/:category?'
              component={MovieListPage}
            />

            <Redirect
              exact
              from='/'
              to='/search/'
            />

            {/* <Route
              component={NotFoundPage}
            /> */}
          </Switch>
        </div>
      </Fragment>
    );
  }
}
