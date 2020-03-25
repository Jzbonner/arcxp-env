import React from 'react';
import PropTypes from 'prop-types';
import BaseMarkup from '../_helper_components/amp/BaseMarkup';
import Html from '../_helper_components/amp/Html';
import AmpCustomStyles from '../_helper_components/amp/AmpCustomStyle';
import AmpPageLayout from '../layouts/article-amp';

const AmpOutputType = (props) => {
  const {
    globalContent,
  } = props;

  const {
    canonical_url: articleURL,
  } = globalContent || {};

  return (
    <Html>
    <head>
      <BaseMarkup canonicalUrl={articleURL} />
      <AmpCustomStyles/>
    </head>
    <body>
      <AmpPageLayout />
    </body>
    </Html>
  );
};

AmpOutputType.propTypes = {
  children: PropTypes.node,
  globalContent: PropTypes.object,
};

export default AmpOutputType;
