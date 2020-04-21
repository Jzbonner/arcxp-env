import React from 'react';
import PropTypes from 'prop-types';
import { useAppContext } from 'fusion:context';

/*
This image component is for icons, badges and logos that:
 - don't need resizing or credits
 - don't need the extra markup in the Image component(c-imageComponent)
 - are stored in the repo instead of retrieved from an API
*/

const ImageSimple = ({
  src, ampPage, alt, classes, ampMobileHeight, ampMobileMinWidth,
}) => {
  const { deployment, contextPath } = useAppContext();

  const getPath = () => {
    if (src.includes('data:image/svg+xml')) {
      return src;
    }
    return deployment(`${contextPath}${src}`);
  };

  if (ampPage) {
    return <amp-img src={getPath(src)} alt={alt} height={ampMobileHeight} width={ampMobileMinWidth} layout="intrinsic" />;
  }
  return <img className={classes} src={getPath(src)} alt={alt} />;
};

ImageSimple.propTypes = {
  src: PropTypes.string,
  ampPage: PropTypes.bool.isRequired,
  alt: PropTypes.string,
  classes: PropTypes.string,
  ampMobileMinWidth: PropTypes.string,
  ampMobileHeight: PropTypes.string,
};

export default ImageSimple;