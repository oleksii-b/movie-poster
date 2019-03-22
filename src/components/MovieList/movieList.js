import React, {Fragment} from 'react';
import {Spring} from 'react-spring';
import {Glyphicon} from 'react-bootstrap';
import ReactPaginate from 'react-paginate';

import classes from './MovieList.less';


export default function movieList(props) {
  const {movies, moviesPerPage, currentItems, pageCount, currentPage, onPageChange} = props;

  return movies.length
    ?
      <Fragment>
        {
          movies.length > moviesPerPage
          &&
            <div className='text-center'>
              <ReactPaginate
                previousLabel={'‹'}
                nextLabel={'›'}
                breakLabel={'...'}
                breakClassName={'break-me'}
                pageCount={pageCount}
                initialPage={currentPage}
                forcePage={currentPage}
                marginPagesDisplayed={1}
                pageRangeDisplayed={3}
                onPageChange={onPageChange}
                containerClassName={'pagination'}
                subContainerClassName={'pages pagination'}
                activeClassName={'active'}
              />
            </div>
        }

        <ul className={classes.container}>
          {
            currentItems && currentItems.map((movie) => {
              return (
                <Fragment
                  key={movie.id}
                >
                  <Spring
                    from={{
                      opacity: 0,
                    }}
                    to={{
                      opacity: 1,
                    }}
                  >
                    {
                      (props) => (
                        <li className={classes.itemContainer}>
                          <section className={classes.item} style={props}>
                            <div className={classes.itemPoster}>
                              <div className={classes.itemGenre}>
                                {movie.genre}
                              </div>

                              <img src={movie.poster} alt='' />
                            </div>

                            <header className={classes.itemInfo}>
                              <h2 className={classes.itemTitle}>
                                {movie.title}
                              </h2>

                              <div className={classes.itemRating}>
                                <Glyphicon
                                  glyph='star'
                                />

                                &nbsp;{movie.rating}
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
      </Fragment>
    :
      <h6 className={classes.noResult}>
        Ничего не найдено
      </h6>
}
