import React from 'react';
import PropTypes from 'prop-types';


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
  children: PropTypes.element.isRequired
};
