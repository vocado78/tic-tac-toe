import React, { Component } from 'react';

import './App.css';
import Board from '../Board/Board';
import TextArea from '../TextArea/TextArea';
import { ResetButton } from '../Button';
import { setSquareValue, clearBoardIfGameOver } from '../../services/gameLogic';
import getBestEmptySquare from '../../services/ai';


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
    if (this.timeout1) clearTimeout(this.timeout1);
    if (this.timeout2) clearTimeout(this.timeout2);
  }

  setSquareValue = (i) => {
    this.setState((prevState) => {
      const newBoard = setSquareValue(prevState.board, i, prevState.nextPlayer);
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
      const newBoard = clearBoardIfGameOver(prevState.board);
      return { board: newBoard };
    });
  }

  delayClearBoard = () => {
    if (this.timeout1) clearTimeout(this.timeout1);
    this.timeout1 = setTimeout(() => this.clearBoardIfGameOver(), 2000);
  }

  setGameType = (id) => {
    this.setState({
      singlePlayer: id === 'single'
    });
  }

  makeMove = (i) => {
    this.setSquareValue(i);
    this.toggleNextPlayer();
    this.delayClearBoard();
  }

  simulateComputerClick = () => {
    const i = getBestEmptySquare(this.state.board, this.state.nextPlayer);
    this.makeMove(i);
  }

  delaySimulateComputerClick = () => {
    if (this.state.singlePlayer) {
      if (this.timeout2) clearTimeout(this.timeout2);
      this.timeout2 = setTimeout(() => this.simulateComputerClick(), 2000);
    }
  }

  handleSquareClick = (i) => {
    this.makeMove(i);
    this.delaySimulateComputerClick();
  }

  handleReset = () => {
    this.setState({
      board: Array(9).fill(null),
      nextPlayer: '',
      singlePlayer: null
    });
  }

  render() {
    return (
      <>
        <Board board={this.state.board} handleSquareClick={this.handleSquareClick} nextPlayer={this.state.nextPlayer} />
        <TextArea
          board={this.state.board}
          singlePlayer={this.state.singlePlayer}
          nextPlayer={this.state.nextPlayer}
          setGameType={this.setGameType}
          toggleNextPlayer={this.toggleNextPlayer}
        />
        <ResetButton onClick={this.handleReset} />
      </>
    );
  }
}
