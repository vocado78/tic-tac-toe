import React from 'react';

const GameContext = React.createContext({
  squares: Array(9).fill(null),
  nextPlayer: '',
  singlePlayer: null,
  statusMessage: '',
  setSquareValue: () => {},
  toggleNextPlayer: () => {},
  setGameType: () => {},
  setStatusMessage: () => {},
  clearBoardIfGameOver: () => {}
});

export default GameContext;
