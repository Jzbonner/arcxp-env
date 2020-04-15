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
      <script async custom-element="amp-position-observer" src="https://cdn.ampproject.org/v0/amp-position-observer-0.1.js"></script>
      <script async custom-element="amp-animation" src="https://cdn.ampproject.org/v0/amp-animation-0.1.js"></script>
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
