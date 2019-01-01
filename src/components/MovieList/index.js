import React, {Fragment} from 'react';
import {Spring} from 'react-spring';

import styles from './MovieList.less';


export default function MovieList({movies}) {
  return movies.length
    ?
      <ul className={styles['movie-list']}>
      {
        movies.map((movie) => {
          return (
            <Fragment key={movie.id}>
              <Spring
                from={{
                  opacity: 0,
                }}
                key={
                  movie.id
                }
                to={{
                  opacity: 1,
                }}
              >
              {
                (props) => (
                  <li className={styles['movie-list__item']}>
                    <section className={styles['movie']} style={props}>
                      <div className={styles['poster']}>
                        <div className={styles['genre']}>
                          {movie.genre}
                        </div>

                        <img src={movie.poster} alt='' />
                      </div>

                      <header className={styles['movie-info']}>
                        <h2 className={styles['title']}>
                          {movie.title}
                        </h2>

                        <div className={styles['rating']}>
                          {movie.rating}
                        </div>
                      </header>
                    </section>
                  </li>
                )
              }
              </Spring>
            </Fragment>
          );
        })
      }
      </ul>
    :
      <h6 className={styles['no-result']}>
        Ничего не найдено
      </h6>
}
