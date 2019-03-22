import React from 'react';
import {Link, NavLink} from 'react-router-dom';
import cx from 'classnames';

import SearchForm from 'components/SearchForm';
import classes from './Header.less';


export default function header(props) {
  return (
    <header className={cx('header', classes.container)}>
      <div className='container'>
        <div className={classes.topContent}>
          <Link to='/' className={cx(classes.logo, 'logo')} />

          <SearchForm />
        </div>

        <nav className={classes.filters}>
          <NavLink
            to='/movies/latest'
            className={cx(classes.filter, 'latest')}
            activeClassName={classes.active}
          >
            <span className={classes.filterTitle}>Новинки 2018</span>
          </NavLink>

          <NavLink
            to='/movies/upcoming'
            className={cx(classes.filter, 'upcoming')}
            activeClassName={classes.active}
          >
            <span className={classes.filterTitle}>Скоро в кинотеатрах</span>
          </NavLink>

          <NavLink
            to='/movies/popular'
            className={cx(classes.filter, 'popular')}
            activeClassName={classes.active}
          >
            <span className={classes.filterTitle}>В топ-чартах</span>
          </NavLink>
        </nav>
      </div>
    </header>
  );
}
