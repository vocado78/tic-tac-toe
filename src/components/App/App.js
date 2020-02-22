import React, { Component } from 'react';

import Board from '../Board/Board';
import TextArea from '../TextArea/TextArea';
import GameService from '../../services/GameService';


export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      board: Array(9).fill(null),
      nextPlayer: '',
      singlePlayer: null
    };
  }

  componentWillUnmount() {
    if (this.timeout) clearTimeout(this.timeout);
  }

  setSquareValue = (i) => {
    this.setState((prevState) => {
      const newBoard = GameService.setSquareValue(prevState.board, i, prevState.nextPlayer);
      return { board: newBoard };
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
      const newBoard = GameService.clearBoardIfGameOver(prevState.board);
      return { board: newBoard };
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
    return (
      <>
        <Board board={this.state.board} handleSquareClick={this.handleSquareClick} />
        <TextArea
          board={this.state.board}
          singlePlayer={this.state.singlePlayer}
          nextPlayer={this.state.nextPlayer}
          setGameType={this.setGameType}
          toggleNextPlayer={this.toggleNextPlayer}
        />
      </>
    );
  }
}

// single player is needed for AI or not
