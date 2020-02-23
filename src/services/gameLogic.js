import { ALL_ROWS } from '../constants';


const getWinner = (board) => {
  let winner = '';

  ALL_ROWS.forEach((row) => {
    const [a, b, c] = row;
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      winner = board[a];
    }
  });

  return winner;
};

const boardIsFull = (board) => {
  return board.indexOf(null) < 0;
};

export const setSquareValue = (board, i, nextPlayer) => {
  const newBoard = [...board];

  if (!newBoard[i]) {
    newBoard[i] = nextPlayer === 'X' ? 'X' : 'O';
  }
  return newBoard;
};

export const clearBoardIfGameOver = (board) => {
  const fullBoard = boardIsFull(board);
  const winner = getWinner(board);

  if (winner || fullBoard) {
    return Array(9).fill(null);
  }

  return board;
};

export const getStatusMessage = (board, nextPlayer) => {
  const fullBoard = boardIsFull(board);
  const winner = getWinner(board);
  let message;

  if (winner) {
    message = `We have a winner! Congrats to player ${winner}.`;
  }
  if (!winner && fullBoard) {
    message = 'It was a draw...nice try though.';
  }
  if (!winner && !fullBoard) {
    message = `Next player is ${nextPlayer}`;
  }

  return message;
};
