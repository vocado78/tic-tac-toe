import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Preference from './Preference/Preference';
import { RadioButton } from '../Button';
import Status from './Status/Status';
import { getStatusMessage } from '../../services/gameLogic';
import { QUESTIONS } from '../../constants';


export default class TextArea extends Component {
  handleGameTypeClick = (e) => {
    this.props.setGameType(e.target.id);
  }

  handleSymbolClick = (e) => {
    this.props.toggleNextPlayer(e.target.value);
  }

  renderPreferences() {
    const question = this.props.singlePlayer
      ? QUESTIONS.CHAR_TYPE_SINGLE
      : QUESTIONS.CHAR_TYPE_PAIR;

    if (this.props.nextPlayer) {
      return null;
    }

    return this.props.singlePlayer !== null ? (
      <Preference question={question}>
        <RadioButton
          id="x"
          name="char"
          label="X"
          onClick={this.handleSymbolClick}
        />
        <RadioButton
          id="o"
          name="char"
          label="O"
          onClick={this.handleSymbolClick}
        />
      </Preference>
    ) : (
      <Preference question={QUESTIONS.GAME_TYPE}>
        <RadioButton
          id="single"
          name="game"
          label="1 Player"
          onClick={this.handleGameTypeClick}
        />
        <RadioButton
          id="pair"
          name="game"
          label="2 Players"
          onClick={this.handleGameTypeClick}
        />
      </Preference>
    );
  }

  render() {
    const { board, nextPlayer } = this.props;
    const statusMessage = getStatusMessage(board, nextPlayer);

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
