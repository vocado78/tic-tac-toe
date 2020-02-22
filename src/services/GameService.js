const rows = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];

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
    console.log(message);
    return message;
  },

  getWinner(board) {
    let winner = '';

    rows.forEach((row) => {
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
