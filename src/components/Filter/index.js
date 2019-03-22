import React, {Component} from 'react';

import filter from './filter';


export default class Filter extends Component {
  state = {
    selectedOptions: []
  }

  onSelectChange = (selectedOptions) => {
    this.setState({
      selectedOptions
    }, () => {
      this.props.setFilters(this.state.selectedOptions.map((option) => {
        return option.value;
      }));
    });
  }

  render = () => {
    return filter({
      onSelectChange: this.onSelectChange,
      value: this.state.selectedOptions
    });
  }
}
