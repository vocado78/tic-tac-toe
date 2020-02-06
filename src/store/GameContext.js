import React from 'react';

const GameContext = React.createContext({
  squares: Array(9).fill(null),
  nextPlayer: 'X',
  singlePlayer: null,
  setSquareValue: () => {},
  toggleNextPlayer: () => {},
  setGameType: () => {}
});

export default GameContext;
