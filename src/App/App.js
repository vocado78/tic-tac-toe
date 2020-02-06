import React from 'react';

import Board from '../Board/Board';
import TextArea from '../TextArea/TextArea';
import GameDataProvider from '../store/GameDataProvider';


export default function App() {
  return (
    <GameDataProvider>
      <Board />
      <TextArea />
    </GameDataProvider>
  );
}
