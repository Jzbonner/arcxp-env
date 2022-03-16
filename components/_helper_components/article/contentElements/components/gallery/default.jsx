import React from 'react';
import PropTypes from 'prop-types';
import Gallery from '../../../../../features/gallery/default';

const GalleryEmbed = ({ src }) => (<div className="b-margin-bottom-d40-m20">
    <Gallery isEmbed={true} contentElements={src} taxonomy={src?.taxonomy} />
  </div>);

GalleryEmbed.propTypes = {
  src: PropTypes.object,
};

export default GalleryEmbed;
