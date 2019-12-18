import React from 'react';
import PropTypes from 'prop-types';
import ContentElements from '../default';

const BlockQuote = ({ src }) => (
  <div style={{ border: '1px solid #000', padding: '10px' }}>
    Content Element Type: <strong>Block Quote</strong>
    <ContentElements content={src.content_elements} />
  </div>
);

BlockQuote.propTypes = {
  src: PropTypes.any,
};

export default BlockQuote;
