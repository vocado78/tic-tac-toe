/* eslint-disable react/no-unused-state */
import React, { Component } from 'react';
import PropTypes from 'prop-types';

import GameContext from './GameContext';
import GameService from '../services/GameService';


export default class GameDataProvider extends Component {
  constructor(props) {
    super(props);

    this.setSquareValue = (i) => {
      this.setState((prevState) => {
        const newSquares = GameService.setSquareValue(prevState.squares, i, prevState.nextPlayer);
        return { squares: newSquares };
      });
    };

    this.toggleNextPlayer = (val = '') => {
      if (val) {
        this.setState({ nextPlayer: val });
      } else {
        this.setState((prevState) => ({
          nextPlayer: prevState.nextPlayer === 'X' ? 'O' : 'X'
        }));
      }
    };

    this.setGameType = (id) => {
      this.setState({
        singlePlayer: id === 'single'
      });
    };

    this.state = {
      squares: Array(9).fill(null),
      nextPlayer: 'X',
      singlePlayer: null,
      setSquareValue: this.setSquareValue,
      toggleNextPlayer: this.toggleNextPlayer,
      setGameType: this.setGameType
    };
  }

  render() {
    const { children } = this.props;

    return (
      <GameContext.Provider value={this.state}>
        {children}
      </GameContext.Provider>
    );
  }
}

GameDataProvider.propTypes = {
  children: PropTypes.arrayOf(PropTypes.element).isRequired
};
