import React from 'react';
import PropTypes from 'prop-types';
import './default.scss';

const ImageComponent = ({
  imageSource, alt, outerComponentClassName, linkUrl,
}) => {
  const component = (
    <div className={`image-${outerComponentClassName} image-default`}>
      <img src={imageSource} alt={alt} />
    </div>
  );
  if (linkUrl) {
    return <a href={linkUrl}>{component}</a>;
  }
  return component;
};
ImageComponent.propTypes = {
  imageSource: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  outerComponentClassName: PropTypes.oneOf(['head', 'breaking', 'thumbnail']),
  linkUrl: PropTypes.string,
};
export default ImageComponent;
