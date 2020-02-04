import React from 'react';
import PropTypes from 'prop-types';


export default function ResetButton({ onClick }) {
  return (
    <button type="button" className="reset" onClick={onClick}>Reset</button>
  );
}

ResetButton.propTypes = {
  onClick: PropTypes.func.isRequired
};
