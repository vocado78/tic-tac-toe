import React, { Component } from 'react';

import Board from '../Board/Board';
import TextArea from '../TextArea/TextArea';
import GameService from '../../services/GameService';


export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      squares: Array(9).fill(null),
      nextPlayer: '',
      singlePlayer: null
    };
  }

  componentWillUnmount() {
    if (this.timeout) clearTimeout(this.timeout);
  }

  setSquareValue = (i) => {
    this.setState((prevState) => {
      const newSquares = GameService.setSquareValue(prevState.squares, i, prevState.nextPlayer);
      return { squares: newSquares };
    });
  };

  toggleNextPlayer = (val = '') => {
    if (val) {
      this.setState({ nextPlayer: val });
    } else {
      this.setState((prevState) => ({
        nextPlayer: prevState.nextPlayer === 'X' ? 'O' : 'X'
      }));
    }
  };

  clearBoardIfGameOver = () => {
    this.setState((prevState) => {
      const newSquares = GameService.clearBoardIfGameOver(prevState.squares);
      return { squares: newSquares };
    });
  }

  delayClearBoard = () => {
    if (this.timeout) clearTimeout(this.timeout);
    this.timeout = setTimeout(() => this.clearBoardIfGameOver(), 2000);
  }

  setGameType = (id) => {
    this.setState({
      singlePlayer: id === 'single'
    });
  }

  handleSquareClick = (i) => {
    this.setSquareValue(i);
    this.toggleNextPlayer();
    this.delayClearBoard();
  }

  render() {
    const { squares, singlePlayer, nextPlayer } = this.state;
    return (
      <>
        <Board squares={squares} handleSquareClick={this.handleSquareClick} />
        <TextArea
          squares={squares}
          singlePlayer={singlePlayer}
          nextPlayer={nextPlayer}
          setGameType={this.setGameType}
          toggleNextPlayer={this.toggleNextPlayer}
        />
      </>
    );
  }
}

// single player is needed for AI or not
