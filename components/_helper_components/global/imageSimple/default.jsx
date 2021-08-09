import React from 'react';
import PropTypes from 'prop-types';
import { useAppContext, useFusionContext } from 'fusion:context';
import getProperties from 'fusion:properties';
import getDomain from '../../../layouts/_helper_functions/getDomain';

/*
This image component is for icons, badges and logos that:
 - don't need resizing or credits
 - don't need the extra markup in the Image component(c-imageComponent)
 - are stored in the repo instead of retrieved from an API
*/

const ImageSimple = ({
  src, ampPage, alt, classes, ampMobileHeight, ampMobileMinWidth,
}) => {
  const fusionContext = useFusionContext();
  const { arcSite, layout } = fusionContext;
  const { cdnSite, cdnOrg } = getProperties(arcSite);
  const { deployment, contextPath } = useAppContext();

  const getPath = () => {
    if (src.includes('data:image/svg+xml') || src.endsWith('.gif')) {
      return src;
    }
    return `${getDomain(layout, cdnSite, cdnOrg, arcSite)}${deployment(`${contextPath}${src}`)}`;
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
