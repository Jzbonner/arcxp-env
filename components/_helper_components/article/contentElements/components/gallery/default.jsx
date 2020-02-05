import React from 'react';
import PropTypes from 'prop-types';

const Gallery = ({ src }) => (
  <div className="b-margin-bottom-d40-m20">
    <p>Content Element Type: <strong>Gallery</strong> Not Worked. Content: {src.content}</p>
  </div>
);

Gallery.propTypes = {
  src: PropTypes.object,
};

export default Gallery;
