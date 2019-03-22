import React, {Component} from 'react';
import {Redirect} from 'react-router-dom';

import searchForm from './searchForm';


export default class SearchForm extends Component {
  static needRedirect = false;
  static query = '';

  componentDidUpdate = () => {
    this.needRedirect = false;
  }

  setInputRef = (input) => {
    this.input = input;
  }

  submitForm = (evt) => {
    evt.preventDefault();

    this.needRedirect = true;
    this.query = this.input.value.trim().toLowerCase();

    this.query && this.forceUpdate();
  }

  render = () => {
    return (
      this.needRedirect
      ?
        <Redirect
          to={`/search?q=${this.query}`}
        />
      :
        searchForm({
          onFormSubmit: this.submitForm,
          setInputRef: this.setInputRef
        })
    )
  }
}
