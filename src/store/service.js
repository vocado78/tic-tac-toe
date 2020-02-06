const GameService = {
  setSquareValue(squares, i, nextPlayer) {
    const newSquares = [...squares];

    if (!newSquares[i]) {
      newSquares[i] = nextPlayer === 'X' ? 'X' : 'O';
    }
    return newSquares;
  }
};

export default GameService;
