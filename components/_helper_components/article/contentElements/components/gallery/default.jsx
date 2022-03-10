import React from 'react';
import PropTypes from 'prop-types';
import Gallery from '../../../../../features/gallery/default';

const GalleryEmbed = ({ src }) => {
  console.log('src galley', src);
  return (<div className="b-margin-bottom-d40-m20">
    <Gallery contentElements={src} taxonomy={src?.taxonomy} />
  </div>);
};

GalleryEmbed.propTypes = {
  src: PropTypes.object,
};

export default GalleryEmbed;
