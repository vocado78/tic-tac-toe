import React from 'react';
import { render } from '@testing-library/react';

import Board from '../Board';
import { INITIAL_BOARD } from '../../../constants';


describe('Board', () => {
  it('renders 3 rows with a total of 9 cells with default props', () => {
    const totalNumOfRows = 3;
    const totalNumOfCells = 9;

    const { container } = render(<Board board={INITIAL_BOARD} handleSquareClick={() => {}} />);
    expect(container.querySelectorAll('tr').length).toEqual(totalNumOfRows);
    expect(container.querySelectorAll('td').length).toEqual(totalNumOfCells);
  });
});
