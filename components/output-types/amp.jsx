import React from 'react';
import PropTypes from 'prop-types';
import getProperties from 'fusion:properties';
import { useFusionContext } from 'fusion:context';
import BaseMarkup from '../_helper_components/amp/BaseMarkup';
import Html from '../_helper_components/amp/Html';
import AmpCustomStyles from '../_helper_components/amp/AmpCustomStyle';
import AmpScripts from '../_helper_components/amp/AmpScripts';
import GoogleStructuredData from '../_helper_components/article/googleData/default';
import SiteMetrics from '../_helper_components/global/siteMetrics/default';
import SophiTags from '../_helper_components/global/sophi/default';
import SiteMetaAmp from '../_helper_components/global/siteMeta/amp';
import handleSiteName from '../layouts/_helper_functions/handleSiteName.js';

const AmpOutputType = (props) => {
  const {
    globalContent,
    children,
    arcSite: arcSiteFromProps = getProperties().sites[0],
  } = props;
  const fusionContext = useFusionContext();
  const { arcSite } = fusionContext;
  const currentSite = arcSite || arcSiteFromProps;
  const {
    canonical_url: articleURL,
    canonical_website: canonicalSite,
    content_elements: contentElements,
    promo_items: promoItems,
  } = globalContent || {};
  const { basic: storyPromoItems = {} } = promoItems || {};

  return (
    <Html>
    <head>
      <BaseMarkup canonicalUrl={`https://www.${handleSiteName(canonicalSite)}.com${articleURL}`} />
      <AmpCustomStyles arcSite={currentSite} outputTypeProps={props} />
      <AmpScripts contentElements={contentElements} storyPromoItems={storyPromoItems} arcSite={arcSite}/>
      <GoogleStructuredData />
      <SiteMetaAmp />
    </head>
    <body>
      <SophiTags isAmp={true} />
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
