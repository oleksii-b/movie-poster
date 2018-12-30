import React, {Component} from 'react';
import {Redirect} from 'react-router-dom';


export default class SearchMoviesForm extends Component {
  static needRedirect = false;

  onFormSubmit = (evt) => {
    this.needRedirect = true;

    evt.preventDefault();
    this.forceUpdate();
  }

  componentDidUpdate() {
    this.needRedirect = false;
  }

  render = () => {
    return (
      this.needRedirect ?
      <Redirect to={`/search?q=${this.input.value}`} />
      :
      <form onSubmit={this.onFormSubmit}>
        <input ref={(input) => this.input = input} />
        <button>
          Search
        </button>
      </form>
    )
  }
}
