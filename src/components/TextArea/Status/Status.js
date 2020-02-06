import React from 'react';
import PropTypes from 'prop-types';

export default function Status({ message }) {
  return (
    <div className="status">{message}</div>
  );
}

Status.propTypes = {
  message: PropTypes.string.isRequired
};
