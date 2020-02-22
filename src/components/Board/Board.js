import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Square from './Square/Square';
import './Board.css';
import ROWS from '../../constants';


export default class Board extends Component {
  renderRow(row) {
    return row.map((i) => {
      return (
        <Square
          key={i}
          value={this.props.squares[i]}
          index={i}
          handleClick={this.props.handleSquareClick}
        />
      );
    });
  }

  render() {
    return (
      <div className="board-wrapper">
        <div className="open-shutters left" />
        <table className="board">
          <tbody>
            <tr className="row">
              {this.renderRow(ROWS[0])}
            </tr>
            <tr className="row">
              {this.renderRow(ROWS[1])}
            </tr>
            <tr className="row">
              {this.renderRow(ROWS[2])}
            </tr>
          </tbody>
        </table>
        <div className="open-shutters right" />
      </div>
    );
  }
}

Board.propTypes = {
  squares: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.object, PropTypes.string])).isRequired,
  handleSquareClick: PropTypes.func.isRequired
};
