import React from 'react';
import PropTypes from 'prop-types';
import BaseMarkup from '../_helper_components/amp/BaseMarkup';
import Html from '../_helper_components/amp/Html';

const AmpOutputType = (props) => {
  const {
    children, globalContent,
  } = props;

  const {
    canonical_url: articleURL,
  } = globalContent || {};

  return (
    <Html>
    <head>
      <BaseMarkup canonicalUrl={articleURL} />
      {/* add additional head elements here. This is where you would include amp component required scripts. */}
    </head>
    <body>{ children }</body>
    </Html>
  );
};

AmpOutputType.propTypes = {
  children: PropTypes.node,
  globalContent: PropTypes.object,
};

export default AmpOutputType;
