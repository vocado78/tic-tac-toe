export const HORIZONTAL_ROWS = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8]
];

export const ALL_ROWS = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];

export const QUESTIONS = {
  GAME_TYPE: 'How would you like to play?',
  CHAR_TYPE_SINGLE: 'Would you like to be X or O?',
  CHAR_TYPE_PAIR: 'Player 1, would you like to be X or O?'
};

export const STATUS = {
  WINNER: 'We have a winner! Congrats to player ',
  DRAW: 'It was a draw, nice try though.',
  NEXT: 'Next player is: ',
};
