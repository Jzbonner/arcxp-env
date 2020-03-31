import React from 'react';
import PropTypes from 'prop-types';
import getProperties from 'fusion:properties';
import BaseMarkup from '../_helper_components/amp/BaseMarkup';
import Html from '../_helper_components/amp/Html';
import AmpCustomStyles from '../_helper_components/amp/AmpCustomStyle';

const AmpOutputType = (props) => {
  const {
    globalContent,
    children,
    arcSite = getProperties().sites[0],
  } = props;

  const {
    canonical_url: articleURL,
  } = globalContent || {};

  return (
    <Html>
    <head>
      <BaseMarkup canonicalUrl={articleURL} />
      <AmpCustomStyles arcSite={arcSite} outputTypeProps={props} />
    </head>
    <body>
      { children }
    </body>
    </Html>
  );
};

AmpOutputType.propTypes = {
  arcSite: PropTypes.string,
  children: PropTypes.node,
  globalContent: PropTypes.object,
  contextPath: PropTypes.string,
};

export default AmpOutputType;
