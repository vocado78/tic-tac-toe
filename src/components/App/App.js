import React from 'react';

import Board from '../Board/Board';
import TextArea from '../TextArea/TextArea';
import GameDataProvider from '../../store/GameDataProvider';


export default function App() {
  return (
    <GameDataProvider>
      <Board />
      <TextArea />
    </GameDataProvider>
  );
}

// textArea comp needs: if win or draw and next player, handle user clicks for symbol and game type
// -> to calc win or draw, state of board is needed
// --> have it read data (board status and next player) from context in render

// board comp needs: state of board (squares), handle user clicks on squares
// --> on square click: 1. set value 2. set message 3. clear board if game over

// single player is needed for AI or not
