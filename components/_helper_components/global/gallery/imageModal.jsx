import React from 'react';
import PropTypes from 'prop-types';

const ImageModal = ({ src = '', isVisible }) => (
    <div className={`c-image-modal ${isVisible ? 'image-modal-active' : ''}`}>
     {src && <img src={src} alt='Gallery image modal' />}
    </div>
);

ImageModal.propTypes = {
  src: PropTypes.string,
  isVisible: PropTypes.bool,
};

export default ImageModal;
