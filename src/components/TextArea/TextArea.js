import React, { Component } from 'react';

import Preference from './Preference/Preference';
import { RadioButton } from '../Button';
import Status from './Status/Status';
import GameContext from '../../store/GameContext';
// import GameService from '../../services/GameService';

export default class TextArea extends Component {
  handleGameTypeClick = (e) => {
    const { setGameType } = this.context;
    setGameType(e.target.id);
  }

  handleSymbolClick = (e) => {
    const { toggleNextPlayer } = this.context;
    toggleNextPlayer(e.target.value);
  }

  render() {
    const { singlePlayer, statusMessage } = this.context;
    const question2 = singlePlayer ? 'Would you like to be X or O?' : 'Player 1, would you like to be X or O?';
    // const statusMessage = GameService.setStatusMessage(squares, nextPlayer);

    return (
      <div className="text-area">
        <Status message={statusMessage} />
        <Preference question="How would you like to play?">
          <RadioButton id="single" name="game" label="1 Player" onClick={this.handleGameTypeClick} />
          <RadioButton id="pair" name="game" label="2 Players" onClick={this.handleGameTypeClick} />
        </Preference>
        <Preference question={question2}>
          <RadioButton id="x" name="symbol" label="X" onClick={this.handleSymbolClick} />
          <RadioButton id="o" name="symbol" label="O" onClick={this.handleSymbolClick} />
        </Preference>
      </div>
    );
  }
}

TextArea.contextType = GameContext;
