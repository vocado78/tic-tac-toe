// 2 player game
// DONE: clicking on a square button updates its display value
// DONE: status message is displayed with who's next to play
// square is updated only if no value already there
// nextPlayer is not the same as the player who last made a move
// if there is a winner or the board is full (draw), the board is cleared

// single player game
// computer makes a move, according to steps above

import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import App from '../App';


const getRandomInt = (maxInt) => {
  return Math.floor(Math.random() * maxInt);
};

describe('App', () => {
  it('updates and displays square value and nextPlayer on square click', () => {
    const { getByLabelText, getAllByRole, getByText } = render(<App />);

    const maxSquares = 9;
    const randomInt = getRandomInt(maxSquares);
    const randomSquare = getAllByRole('button')[randomInt];

    fireEvent.click(getByLabelText('2 Players'));
    fireEvent.click(getByLabelText('X'));

    fireEvent.click(randomSquare);

    expect(randomSquare).toHaveTextContent('X');
    expect(getByText(/next player/i)).toHaveTextContent('O');
  });
});
