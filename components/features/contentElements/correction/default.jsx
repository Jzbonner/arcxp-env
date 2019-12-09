import React from 'react';
import PropTypes from 'prop-types';

const Correction = ({ src }) => (
    <div style={{ border: '1px solid #000', padding: '10px' }}>
      Content Element Type: <strong>Correction</strong>
      <p>{src.content}</p>
    </div>
);

Correction.propTypes = {
  src: PropTypes.node,
};

export default Correction;
