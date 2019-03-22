import React from 'react';
import {FormGroup, FormControl, Glyphicon} from 'react-bootstrap';

import classes from './SearchForm.less';


export default function searchForm(props) {
  const {onFormSubmit, setInputRef} = props;

  return (
    <form onSubmit={onFormSubmit}>
      <FormGroup
        className={classes.formGroup}
      >
        <FormControl
          inputRef={(input) => setInputRef(input)}
          type='text'
          placeholder='Название фильма...'
        />

        <FormControl.Feedback
          className={classes.btnSubmit}
          onClick={onFormSubmit}
        >
          <Glyphicon
            glyph='search'
          />
        </FormControl.Feedback>
      </FormGroup>
    </form>
  );
}
