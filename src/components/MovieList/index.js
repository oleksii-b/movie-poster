import React, {Component} from 'react';

import withLoader from 'hoc/withLoader';
import movieList from './movieList';


class MovieList extends Component {
  state = {
    currentPage: 0
  }

  componentWillReceiveProps = (nextProps) => {
    // Rerender the component when items has been updated
    if (JSON.stringify(nextProps.movies) !== JSON.stringify(this.props.movies)) {
      const {movies, moviesPerPage} = nextProps;

      this.setState({
        pageCount: Math.ceil(movies.length / moviesPerPage),
        currentPage: 0,
        currentItems: this.getCurrentItems({
          items: movies,
          itemsPerPage: moviesPerPage,
          currentPage: 0
        })
      });
    }

    if (nextProps.moviesPerPage !== this.props.moviesPerPage) {
      const {movies, moviesPerPage} = nextProps;
      const itemsPerPage = moviesPerPage === 'all' ? movies.length : parseInt(moviesPerPage, 10);

      this.setState({
        pageCount: Math.ceil(movies.length / moviesPerPage),
        currentPage: 0,
        currentItems: this.getCurrentItems({
          items: movies,
          itemsPerPage,
          currentPage: 0
        })
      });
    }
  }

  getCurrentItems = (options) => {
    const {items, itemsPerPage, currentPage} = options;

    return (
      [...items]
        .slice(
          currentPage * itemsPerPage,
          currentPage * itemsPerPage + parseInt(itemsPerPage, 10)
        )
    );
  }

  onPageClick = (data) => {
    const {movies, moviesPerPage} = this.props;
    const selected = data.selected;

    this.setState({
      pageCount: Math.ceil(movies.length / moviesPerPage),
      currentPage: selected,
      currentItems: this.getCurrentItems({
        items: movies,
        itemsPerPage: moviesPerPage,
        currentPage: selected
      })
    });
  };

  render = () => {
    const {movies, moviesPerPage} = this.props;
    const {currentItems, currentPage, pageCount} = this.state;

    return movieList({
      movies,
      moviesPerPage,
      currentItems,
      currentPage,
      pageCount,
      onPageChange: this.onPageClick
    });
  }
}

export default withLoader(MovieList);
