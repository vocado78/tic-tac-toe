import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './Square.css';


export default class Square extends Component {
  handleClick = () => {
    this.props.handleClick(this.props.index);
  }

  render() {
    return (
      <td className="square">
        <button type="button" onClick={this.handleClick}>{this.props.value}</button>
      </td>
    );
  }
}

Square.defaultProps = {
  value: null
};

Square.propTypes = {
  value: PropTypes.string,
  handleClick: PropTypes.func.isRequired,
  index: PropTypes.number.isRequired
};
