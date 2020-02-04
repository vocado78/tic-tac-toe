import React, { Component } from 'react';

import Preference from './Preference/Preference';
import { RadioButton } from '../Button';
import Status from './Status/Status';


export default class TextArea extends Component {
  constructor(props) {
    super(props);
    this.state = {
      singlePlayer: true,
      nextPlayer: ''
    };
  }

  handleGameTypeClick = (e) => {
    this.setState({
      singlePlayer: e.target.id === 'single'
    });
  }

  handleSymbolClick = (e) => {
    this.setState({
      nextPlayer: e.target.value
    });
  }

  render() {
    const { singlePlayer, nextPlayer } = this.state;
    const question2 = singlePlayer ? 'Would you like to be X or O?' : 'Player 1, would you like to be X or O?';

    return (
      <div className="text-area">
        <Status message={`Next player is: ${nextPlayer}`} />
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
