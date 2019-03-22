import React, {Fragment} from 'react';
import {DropdownButton, MenuItem} from 'react-bootstrap';

import classes from './MoviesPerPageSelect';


export default function moviesPerPageSelect(props) {
  const {activeItem, onSelectChange, selectItems} = props;

  return (
    <Fragment>
      <DropdownButton
        className={classes.container}
        title={<span>{activeItem.label} &nbsp;</span>}
        id='moviesPerPage'
        onSelect={onSelectChange}
        pullRight={true}
      >
        {
          selectItems.map((item) => {
            return (
              <MenuItem
                key={item.value}
                eventKey={item.value}
                active={item.value === activeItem.value}
              >
                {item.label}
              </MenuItem>
            );
          })
        }
      </DropdownButton>
    </Fragment>
  );
}
