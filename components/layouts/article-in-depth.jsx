/*  /components/layouts/article-in-depth.jsx  */

import React from 'react';
import { useAppContext } from 'fusion:context';
import PropTypes from 'prop-types';
import getQueryParams from './_helper_functions/getQueryParams';
import GlobalAdSlots from '../_helper_components/global/ads/default';
import Footer from '../_helper_components/global/footer/default';
import Copyright from '../_helper_components/global/copyright/default';
import TopNavBreakingNews from '../_helper_components/global/navBar/TopNavBreakingNews/default';
import getContentMeta from '../_helper_components/global/siteMeta/_helper_functions/getContentMeta';

const ArticleInDepthLayout = (props) => {
  const [zone1] = props.children;
  const appContext = useAppContext();
  const { layout, requestUri } = appContext;
  const queryParams = getQueryParams(requestUri);
  const outPutTypePresent = Object.keys(queryParams).some(paramKey => paramKey === 'outputType');
  const noHeaderAndFooter = outPutTypePresent && queryParams.outputType === 'wrap';

  const { paywallStatus } = getContentMeta();
  const isMeteredStory = paywallStatus === 'premium';
  return (
    <>
      {<GlobalAdSlots pbPage={true} lazyLoad={isMeteredStory} />}
      {/* we omit breaking news on wraps */}
      {!noHeaderAndFooter && <TopNavBreakingNews type={layout} omitBreakingNews={layout.indexOf('wrap-') !== -1} />}
      {<main className="c-sectionContent c-article-inDepth">
        {!Array.isArray(zone1) && zone1}
        {Array.isArray(zone1) && zone1.map(feat => feat)}
      </main>}
      {layout !== 'wrap-header_only' && !noHeaderAndFooter && <>
        <Footer />
        <Copyright />
      </>}
    </>
  );
};

ArticleInDepthLayout.sections = ['Zone 1'];

ArticleInDepthLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ArticleInDepthLayout;
