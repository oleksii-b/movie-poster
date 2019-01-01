import React from 'react';
import {Link, NavLink} from 'react-router-dom';

import SearchMoviesForm from '../SearchMoviesForm';
import {getStyles} from 'helpers';
import styles from './Header.less';


export default function Header(props) {
  const classes = getStyles({
    selectedFilter: 'latest'
  });

  return (
    <header className={`header ${styles['content']}`}>
      <div className='container'>
        <div className={styles['top-content']}>
          <Link to='/' className='logo' />

          <SearchMoviesForm />
        </div>

        <nav className='filters'>
          <NavLink to='/movies/latest' className={classes.latestFilter}>
            <span>Новинки 2018</span>
          </NavLink>

          <NavLink to='/movies/upcoming' className={classes.upcomingFilter}>
            <span>Скоро в кинотеатрах</span>
          </NavLink>

          <NavLink to='/movies/popular' className={classes.popularFilter}>
            <span>В топ-чартах</span>
          </NavLink>
        </nav>
      </div>
    </header>
  );
}
