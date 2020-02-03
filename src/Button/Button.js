import React from 'react';
import PropTypes from 'prop-types';


export default function Button({ className, label, onClick }) {
  return (
    <button type="button" className={className} onClick={onClick}>{label}</button>
  );
}

Button.defaultProps = {
  className: ''
};

Button.propTypes = {
  className: PropTypes.string,
  label: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired
};
