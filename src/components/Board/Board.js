import React from 'react';
import PropTypes from 'prop-types';
import Square from './Square/Square';
import './Board.css';


export default class Board extends React.Component {
  renderSquare(i) {
    const { squares, handleSquareClick } = this.props;
    return (
      <Square
        value={squares[i]}
        onClick={() => handleSquareClick(i)}
      />
    );
  }

  render() {
    return (
      <div className="board-wrapper">
        <div className="open-shutters left" />
        <table className="board">
          <tbody>
            <tr className="row">
              {this.renderSquare(0)}
              {this.renderSquare(1)}
              {this.renderSquare(2)}
            </tr>
            <tr className="row">
              {this.renderSquare(3)}
              {this.renderSquare(4)}
              {this.renderSquare(5)}
            </tr>
            <tr className="row">
              {this.renderSquare(6)}
              {this.renderSquare(7)}
              {this.renderSquare(8)}
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
