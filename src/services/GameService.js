import { ALL_ROWS } from '../constants';


const GameService = {
  setSquareValue(board, i, nextPlayer) {
    const newBoard = [...board];

    if (!newBoard[i]) {
      newBoard[i] = nextPlayer === 'X' ? 'X' : 'O';
    }
    return newBoard;
  },

  clearBoardIfGameOver(board) {
    const boardIsFull = this.boardIsFull(board);
    const winner = this.getWinner(board);

    if (winner || boardIsFull) {
      return Array(9).fill(null);
    }

    return board;
  },

  getStatusMessage(board, nextPlayer) {
    const boardIsFull = this.boardIsFull(board);
    const winner = this.getWinner(board);
    let message;

    if (winner) {
      message = `We have a winner! Congrats to player ${winner}.`;
    }
    if (!winner && boardIsFull) {
      message = 'It was a draw...nice try though.';
    }
    if (!winner && !boardIsFull) {
      message = `Next player is ${nextPlayer}`;
    }

    return message;
  },

  getWinner(board) {
    let winner = '';

    ALL_ROWS.forEach((row) => {
      const [a, b, c] = row;
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        winner = board[a];
      }
    });

    return winner;
  },

  boardIsFull(board) {
    return board.indexOf(null) < 0;
  }
};

export default GameService;
