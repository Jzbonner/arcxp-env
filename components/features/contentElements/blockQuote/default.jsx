import React from 'react';
import PropTypes from 'prop-types';

const BlockQuote = ({ src }) => (
    <div style={{ border: '1px solid #000', padding: '10px' }}>
      Content Element Type: <strong>Block Quote</strong>
      <p>{src.content}</p>
    </div>
);

BlockQuote.propTypes = {
  src: PropTypes.any,
};

export default BlockQuote;
