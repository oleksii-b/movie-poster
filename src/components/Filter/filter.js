import React, {Fragment} from 'react';
import Select from 'react-select';

import {GENRES} from 'utils/config';
import classes from './Filter.less';


export default function filter(props) {
  const genres = [...GENRES].map((genre) => {
    return {
      value: genre,
      label: genre
    }
  });

  const selectStyles = {
    control: () => ({}),
    menu: () => ({}),
    option: () => ({})
  };

  return (
    <Fragment>
      Фильтровать по жанрам:

      <Select
        className={classes.select}
        classNamePrefix={classes.select}
        isMulti={true}
        isSearchable={false}
        noOptionsMessage={() => 'Выбраны все жанры'}
        options={genres}
        onChange={props.onSelectChange}
        value={props.selectedOptions}
        placeholder='Выберете жанр'
        styles={selectStyles}
        theme={(theme) => ({
          ...theme,
          colors: {
            ...theme.colors,
            primary: 'black',
          }
        })}
      />
    </Fragment>
  );
}
