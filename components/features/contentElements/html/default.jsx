import React from 'react';
import PropTypes from 'prop-types';

const HTML = ({ src }) => (
    <div style={{ border: '1px solid #000', padding: '10px' }}>
      Content Element Type: <strong>HTML</strong>
      <div dangerouslySetInnerHTML={{ __html: src.content }}></div>
    </div>
);

HTML.propTypes = {
  src: PropTypes.node,
};

export default HTML;
