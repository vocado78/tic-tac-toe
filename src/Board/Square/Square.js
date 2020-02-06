import React from 'react';
import PropTypes from 'prop-types';

import './Square.css';

export default function Square({ value, onClick }) {
  return (
    <td className="square">
      <button type="button" onClick={onClick}>{value}</button>
    </td>
  );
}

Square.defaultProps = {
  value: null
};

Square.propTypes = {
  value: PropTypes.string,
  onClick: PropTypes.func.isRequired
};
