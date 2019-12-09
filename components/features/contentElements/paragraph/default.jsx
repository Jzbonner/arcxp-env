import React from 'react';
import PropTypes from 'prop-types';

const Paragraph = ({ src }) => (
    <div style={{ border: '1px solid #000', padding: '10px' }}>
      Content Element Type: <strong>Text / Paragraph</strong>
      <p>{src.content}</p>
    </div>
);

Paragraph.propTypes = {
  src: PropTypes.node,
};

export default Paragraph;
