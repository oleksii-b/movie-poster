import React, {Component} from 'react';
import {connect} from 'react-redux';

import {setMoviesPerPage} from 'store/actions/filterMovies';
import moviesPerPageSelect from './moviesPerPageSelect';


const selectItems = [
  {
    value: '5',
    label: '5'
  }, {
    value: '10',
    label: '10'
  }, {
    value: 'all',
    label: 'Все'
  }
];

class MoviesPerPageSelect extends Component {
  state = {
    activeItem: selectItems[0]
  }

  onSelectChange = (value, evt) => {
    this.props.setMoviesPerPage(value);
    this.setState({
      activeItem: {
        value,
        label: evt.target.text
      }
    });
  }

  render = () => {
    const {activeItem} = this.state;

    return moviesPerPageSelect({
      activeItem,
      selectItems,
      onSelectChange: this.onSelectChange
    });
  }
}

function mapDispatchToProps(dispatch) {
  return {
    setMoviesPerPage: (qty) => dispatch(setMoviesPerPage(qty))
  }
}

export default connect(null, mapDispatchToProps)(MoviesPerPageSelect);
