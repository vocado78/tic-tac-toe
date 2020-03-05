import React from 'react';
import PropTypes from 'prop-types';
import './Preference.css';

export default function Preference({ question, children }) {
  return (
    <div className="preference">
      {question}
      <form>
        {children}
      </form>
    </div>
  );
}

Preference.propTypes = {
  question: PropTypes.string.isRequired,
  children: PropTypes.arrayOf(PropTypes.element).isRequired
};
