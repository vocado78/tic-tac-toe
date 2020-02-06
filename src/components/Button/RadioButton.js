import React from 'react';
import PropTypes from 'prop-types';


export default function RadioButton({ id, name, label, onClick }) {
  return (
    <div>
      <input type="radio" id={id} name={name} value={label} onClick={onClick} />
      <label htmlFor={id}>{label}</label>
    </div>
  );
}

RadioButton.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired
};
