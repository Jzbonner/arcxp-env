/*  /components/layouts/video-basic.jsx  */
import React from 'react';
import { useAppContext } from 'fusion:context';
import GlobalAdSlots from '../_helper_components/global/ads/default';
import ArcAd from '../features/ads/default';
import Headline from '../_helper_components/article/headline/default';
import NavBar from '../_helper_components/global/navBar/default';
import Footer from '../_helper_components/global/footer/default';
import Copyright from '../_helper_components/global/copyright/default';
import BreakingNews from '../_helper_components/global/breakingNews/default';
import WeatherAlerts from '../_helper_components/global/weatherAlerts/default';
import checkTags from './_helper_functions/checkTags';

const VideoPageLayout = () => {
  const appContext = useAppContext();
  const { globalContent } = appContext;
  if (!globalContent) return null;

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
      {!noAds && <GlobalAdSlots />}
      <BreakingNews />
      <WeatherAlerts />
      <NavBar articleURL={articleURL} headlines={headlines} comments={comments} type={type}/>
      <main>
        {!noAds && <div className="c-hp01-mp01 b-margin-top-d40-m20">
          <ArcAd staticSlot={'HP00'} />
          <ArcAd staticSlot={'MP01'} />
        </div>}
        <div className="c-header">
          <Headline headlines={headlines} basicItems={basicItems} taxonomy={taxonomy} />
        </div>
      </main>
      <Footer />
      <Copyright />
    </>
  );
};

VideoPageLayout.sections = [];

export default VideoPageLayout;
