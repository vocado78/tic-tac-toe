import React from 'react';

import GameContext from '../store/GameContext';
import Square from './Square/Square';
import './Board.css';

export default class Board extends React.Component {
  setNextPlayer() {
    const { toggleNextPlayer } = this.context;
    toggleNextPlayer();
  }

  handleSquareClick(i) {
    const { setSquareValue } = this.context;
    setSquareValue(i);

    this.setNextPlayer();
  }

  renderSquare(i) {
    const { squares } = this.context;
    return (
      <Square
        value={squares[i]}
        onClick={() => this.handleSquareClick(i)}
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

Board.contextType = GameContext;
