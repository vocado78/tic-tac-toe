import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Preference from './Preference/Preference';
import { RadioButton } from '../Button';
import Status from './Status/Status';
import GameService from '../../services/GameService';


export default class TextArea extends Component {
  handleGameTypeClick = (e) => {
    const { setGameType } = this.props;
    setGameType(e.target.id);
  }

  handleSymbolClick = (e) => {
    const { toggleNextPlayer } = this.props;
    toggleNextPlayer(e.target.value);
  }

  renderPreferences() {
    const { singlePlayer, nextPlayer } = this.props;
    const question2 = singlePlayer ? 'Would you like to be X or O?' : 'Player 1, would you like to be X or O?';

    if (nextPlayer) {
      return null;
    }

    return singlePlayer !== null ? (
      <Preference question={question2}>
        <RadioButton id="x" name="symbol" label="X" onClick={this.handleSymbolClick} />
        <RadioButton id="o" name="symbol" label="O" onClick={this.handleSymbolClick} />
      </Preference>
    ) : (
      <Preference question="How would you like to play?">
        <RadioButton id="single" name="game" label="1 Player" onClick={this.handleGameTypeClick} />
        <RadioButton id="pair" name="game" label="2 Players" onClick={this.handleGameTypeClick} />
      </Preference>
    );
  }

  render() {
    const { board, nextPlayer } = this.props;
    const statusMessage = GameService.getStatusMessage(board, nextPlayer);

    return (
      <div className="text-area">
        {nextPlayer && <Status message={statusMessage} />}
        {this.renderPreferences()}
      </div>
    );
  }
}

TextArea.defaultProps = {
  singlePlayer: null,
  nextPlayer: ''
};

TextArea.propTypes = {
  board: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.object, PropTypes.string])).isRequired,
  singlePlayer: PropTypes.bool,
  nextPlayer: PropTypes.string,
  setGameType: PropTypes.func.isRequired,
  toggleNextPlayer: PropTypes.func.isRequired
};
