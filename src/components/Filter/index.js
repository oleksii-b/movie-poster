import React, {Fragment, Component} from 'react';
import Select from 'react-select';

import styles from './Filter.less';


const genres = [
  'Мультфильм',
  'Фантастика',
  'Драма',
  'Мелодрамма',
  'Боевик',
  'Криминал',
  'Триллер',
  'Фэнтези',
  'Комедия'
].map((genre) => {
  return {
    value: genre,
    label: genre
  }
});

export default class Filter extends Component {
  state = {
    selectedOptions: []
  }

  onSelectChange = (selectedOptions) => {
    // props.filterMovies(selectedOptions);
    this.setState({
      selectedOptions
    }, () => {
      this.props.setFilters(this.state.selectedOptions.map((option) => {
        return option.value;
      }));
    });
  }

  render = () => {
    return (
      <Fragment>
        Фильтровать по жанрам:

        <Select
          className={styles['select']}
          classNamePrefix={styles['select']}
          isMulti={true}
          isSearchable={false}
          noOptionsMessage={() => 'Выбраны все жанры'}
          options={genres}
          onChange={this.onSelectChange}
          value={this.state.selectedOptions}
          placeholder='Выберете жанр'
        />
      </Fragment>
    )
  }
}
