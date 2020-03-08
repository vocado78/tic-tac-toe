import React from 'react';
import { render } from '@testing-library/react';

import Square from '../Square';


const tableRow = document.createElement('tr');
const renderSquare = () => ({
  ...render(
    <Square handleClick={() => {}} index={0} />,
    {
      container: document.body.appendChild(tableRow)
    }
  )
});

describe('Square', () => {
  it('renders with default props', () => {
    const { container } = renderSquare();

    expect(container).toMatchInlineSnapshot(`
      <tr>
        <td
          class="square"
        >
          <button
            type="button"
          />
        </td>
      </tr>
    `);
  });

  it('displays a value when value is not null/falsy', () => {
    const { container, rerender, getByText } = renderSquare();
    expect(container.querySelector('button').value).toBe('');

    rerender(
      <Square value="X" handleClick={() => {}} index={0} />,
      {
        container: document.body.appendChild(tableRow)
      }
    );
    expect(getByText('X')).toBeTruthy();
  });
});
