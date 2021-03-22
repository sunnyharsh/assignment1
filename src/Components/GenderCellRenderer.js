import React, { Component } from 'react';

export default class GenderCellRenderer extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <span>
        {this.props.value}
      </span>
    );
  }
}