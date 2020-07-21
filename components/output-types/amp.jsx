import React from 'react';
import PropTypes from 'prop-types';
import getProperties from 'fusion:properties';
import BaseMarkup from '../_helper_components/amp/BaseMarkup';
import Html from '../_helper_components/amp/Html';
import AmpCustomStyles from '../_helper_components/amp/AmpCustomStyle';
import AmpScripts from '../_helper_components/amp/AmpScripts';
import GoogleStructuredData from '../_helper_components/article/googleData/default';
import SiteMetrics from '../_helper_components/global/siteMetrics/default';
import SiteMetaAmp from '../_helper_components/global/siteMeta/amp';

const AmpOutputType = (props) => {
  const {
    globalContent,
    children,
    arcSite = getProperties().sites[0],
  } = props;

  const {
    canonical_url: articleURL,
    content_elements: contentElements,
    promo_items: promoItems,
  } = globalContent || {};
  const { basic: storyPromoItems = {} } = promoItems || {};

  return (
    <Html>
    <head>
      <BaseMarkup canonicalUrl={articleURL} />
      <AmpScripts contentElements={contentElements} storyPromoItems={storyPromoItems} />
      <AmpCustomStyles arcSite={arcSite} outputTypeProps={props} />
      <GoogleStructuredData />
      <SiteMetaAmp />
    </head>
    <body>
      <SiteMetrics isAmp={true} />
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
