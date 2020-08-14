/*  /components/layouts/video-basic.jsx  */
import React from 'react';
import { useAppContext } from 'fusion:context';
import GlobalAdSlots from '../_helper_components/global/ads/default';
import ArcAd from '../features/ads/default';
import Headline from '../_helper_components/article/headline/default';
import Footer from '../_helper_components/global/footer/default';
import Copyright from '../_helper_components/global/copyright/default';
import checkTags from './_helper_functions/checkTags';
import getQueryParams from './_helper_functions/getQueryParams';

const VideoPageLayout = () => {
  const appContext = useAppContext();
  const { globalContent, outputType, requestUri } = appContext;
  if (!globalContent) return null;

  // ampVideoIframe outputType is used on amp pages, to render only the video page - this is for preroll purposes
  const ampVideoIframe = outputType.toLowerCase() === 'ampvideoiframe';
  const queryParams = getQueryParams(requestUri);
  const { nowrap: detectNoWrap } = queryParams || {};
  const noHeaderAndFooter = detectNoWrap && detectNoWrap === 'y';

  const {
    promo_items: promoItems,
    _id: videoPageId,
    headlines,
    comments,
    canonical_url: articleURL,
    type,
    credits,
    description,
    streams,
    taxonomy,
  } = globalContent || {};

  const basicItems = {
    promo_items: promoItems,
    type,
    credits,
    description,
    streams,
    videoPageId,
  };
  const { tags = [] } = taxonomy || {};
  const noAds = checkTags(tags, 'no-ads');

  return (
    <>
      {!noAds && !ampVideoIframe && <GlobalAdSlots />}
      {!ampVideoIframe && !noHeaderAndFooter && <>
        <BreakingNews />
        <WeatherAlerts />
        <NavBar articleURL={articleURL} headlines={headlines} comments={comments} type={type}/>
      </>}
      <main className={ampVideoIframe ? 'c-amp-video' : ''}>
        {!noAds && !ampVideoIframe && <div className="c-hp01-mp01 b-margin-top-d40-m20">
          <ArcAd staticSlot={'HP00'} />
          <ArcAd staticSlot={'MP01'} />
        </div>}
        <div className="c-header">
          <Headline headlines={headlines} basicItems={basicItems} taxonomy={taxonomy} ampVideoIframe={ampVideoIframe} />
        </div>
      </main>
      {!ampVideoIframe && <>
        {!noHeaderAndFooter && <>
        <Footer />
        <Copyright />
      </>}
      </>}
    </>
  );
};

VideoPageLayout.sections = [];

export default VideoPageLayout;
