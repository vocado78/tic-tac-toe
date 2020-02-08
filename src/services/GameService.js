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
  setSquareValue(squares, i, nextPlayer) {
    const newSquares = [...squares];

    if (!newSquares[i]) {
      newSquares[i] = nextPlayer === 'X' ? 'X' : 'O';
    }
    return newSquares;
  },

  clearBoardIfGameOver(squares) {
    const boardIsFull = this.boardIsFull(squares);
    const winner = this.getWinner(squares);

    if (winner || boardIsFull) {
      return Array(9).fill(null);
    }

    return squares;
  },

  getStatusMessage(squares, nextPlayer) {
    const boardIsFull = this.boardIsFull(squares);
    const winner = this.getWinner(squares);
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

  getWinner(squares) {
    let winner = '';

    rows.forEach((row) => {
      const [a, b, c] = row;
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        winner = squares[a];
      }
    });

    return winner;
  },

  boardIsFull(squares) {
    return squares.indexOf(null) < 0;
  }
};

export default GameService;
