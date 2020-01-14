import React from 'react';
import PropTypes from 'prop-types';

const Correction = ({ src }) => (
    <div className="b-margin-bottom-60">
      <p>Content Element Type: <strong>Correction</strong> Not worked. Content: {src.content}</p>
    </div>
);

Correction.propTypes = {
  src: PropTypes.object,
};

export default Correction;
