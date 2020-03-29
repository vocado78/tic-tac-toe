import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import TextArea from '../TextArea';
import { QUESTIONS, STATUS, INITIAL_BOARD } from '../../../constants';


const renderTextArea = (singlePlayer = null, nextPlayer = '') => ({
  ...render(
    <TextArea
      board={INITIAL_BOARD}
      setGameType={() => {}}
      toggleNextPlayer={() => {}}
      singlePlayer={singlePlayer}
      nextPlayer={nextPlayer}
    />
  )
});

describe('TextArea', () => {
  it('renders game type preference only with default props', () => {
    const { queryByText } = renderTextArea();

    expect(queryByText(QUESTIONS.GAME_TYPE)).toBeInTheDocument();
    expect(queryByText(QUESTIONS.CHAR_TYPE_SINGLE)).not.toBeInTheDocument();
    expect(queryByText(QUESTIONS.CHAR_TYPE_PAIR)).not.toBeInTheDocument();
  });

  it('renders char type preference only if singlePlayer is true or false', () => {
    const singlePlayer = true;
    const { queryByText } = renderTextArea(singlePlayer);

    expect(queryByText(QUESTIONS.CHAR_TYPE_SINGLE)).toBeInTheDocument();
    expect(queryByText(QUESTIONS.GAME_TYPE)).not.toBeInTheDocument();
  });

  it('renders a status message but not any preference if nextPlayer is truthy', () => {
    const nextPlayer = 'X';
    const { queryByText } = renderTextArea(null, nextPlayer);

    expect(queryByText(`${STATUS.NEXT}${nextPlayer}`)).toBeInTheDocument();
    expect(queryByText(QUESTIONS.GAME_TYPE)).not.toBeInTheDocument();
    expect(queryByText(QUESTIONS.CHAR_TYPE_SINGLE)).not.toBeInTheDocument();
    expect(queryByText(QUESTIONS.CHAR_TYPE_PAIR)).not.toBeInTheDocument();
  });
});
