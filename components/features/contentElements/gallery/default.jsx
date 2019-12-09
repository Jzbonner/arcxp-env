import React from 'react';
import PropTypes from 'prop-types';

const Gallery = ({ src }) => (
    <div style={{ border: '1px solid #000', padding: '10px' }}>
      Content Element Type: <strong>Gallery</strong>
      <p>{src.content}</p>
    </div>
);

Gallery.propTypes = {
  src: PropTypes.node,
};

export default Gallery;
