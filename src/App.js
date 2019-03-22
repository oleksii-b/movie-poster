import React, {Component, Fragment} from 'react';
import {Redirect, Route, Switch} from 'react-router-dom';

import {BASE_PATH} from 'utils/config';
import Header from 'components/Header';
import Movies from 'routes/Movies';
import SearchResults from 'routes/SearchResults';
import NotFound from 'routes/NotFound';


export default class App extends Component {
  render = () => {
    return (
      <Fragment>
        <Route
          path='/'
          component={Header}
        />

        <main className='main-content container'>
        {
          location.pathname.match(new RegExp(`^${BASE_PATH}`))
          ?
            <Switch>
              <Redirect
                exact
                from='/'
                to='/movies'
              />

              <Route
                exact
                path='/search'
                component={SearchResults}
              />

              <Route
                path='/movies/:category?'
                component={Movies}
              />

              <Route
                component={NotFound}
              />
            </Switch>
          :
            location.pathname === '/'
            ?
              <Redirect
                to='/search'
              />
            :
              <NotFoundPage />
        }
        </main>
      </Fragment>
    );
  }
}
