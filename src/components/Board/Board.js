import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Square from './Square/Square';
import './Board.css';
import { HORIZONTAL_ROWS } from '../../constants';


export default class Board extends Component {
  renderRow(row) {
    return row.map((i) => {
      return (
        <Square
          key={i}
          value={this.props.board[i]}
          index={i}
          handleClick={this.props.handleSquareClick}
        />
      );
    });
  }

  render() {
    const leftShutter = this.props.nextPlayer ? 'shutters left open-left' : 'shutters left';
    const rightShutter = this.props.nextPlayer ? 'shutters right open-right' : 'shutters right';

    return (
      <div className="board-wrapper">
        <div className={leftShutter} />
        <table className="board">
          <tbody>
            <tr className="row">
              {this.renderRow(HORIZONTAL_ROWS[0])}
            </tr>
            <tr className="row">
              {this.renderRow(HORIZONTAL_ROWS[1])}
            </tr>
            <tr className="row">
              {this.renderRow(HORIZONTAL_ROWS[2])}
            </tr>
          </tbody>
        </table>
        <div className={rightShutter} />
      </div>
    );
  }
}

Board.defaultProps = {
  nextPlayer: ''
};

Board.propTypes = {
  board: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.object, PropTypes.string])).isRequired,
  handleSquareClick: PropTypes.func.isRequired,
  nextPlayer: PropTypes.string
};
