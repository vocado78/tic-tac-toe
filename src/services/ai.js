import { HORIZONTAL_ROWS } from '../constants';


const getWinningSquare = (board, player) => {
  const boardValues = [];
  let product = 0;
  let square = null;

  // give each symbol and blank space a value
  board.forEach((sq, i) => {
    if (sq === null) {
      boardValues[i] = 2;
    } else {
      boardValues[i] = sq === player ? 5 : 3;
    }
  });

  // if product of row values is 50, it's a possible win
  HORIZONTAL_ROWS.forEach((row) => {
    const [a, b, c] = row; // e.g. [0, 1, 2]
    product = boardValues[a] * boardValues[b] * boardValues[c]; // e.g. 5 * 5 * 2

    if (product === 50) {
      if (boardValues[a] === 2) square = a;
      if (boardValues[b] === 2) square = b;
      if (boardValues[c] === 2) square = c;
    }
  });

  return square;
};

const getEmptySquare = (board) => {
  let square;

  // if centre is empty
  if (!board[4]) {
    square = 4;
  } else {
    board.forEach((sq, i) => {
      // if any corner is empty
      if (i % 2 === 0 && !sq) {
        square = i;
      } else if (board[0] && board[2] && board[6] && board[8] && !board[i]) {
        square = i;
      } // otherwise get any empty square
    });
  }

  return square;
};

export default function getBestEmptySquare(board, nextPlayer) {
  const pX = 'X';
  const pO = 'O';
  let index;

  if (nextPlayer === pX) {
    index = getWinningSquare(board, pX) || getWinningSquare(board, pO);
  }

  if (nextPlayer === pO) {
    index = getWinningSquare(board, pO) || getWinningSquare(board, pX);
  }

  if (!index) {
    index = getEmptySquare(board);
  }

  return index;
}
