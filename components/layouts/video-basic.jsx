/*  /components/layouts/video-basic.jsx  */
import React from 'react';
import { useAppContext } from 'fusion:context';
import GlobalAdSlots from '../_helper_components/global/ads/default';
import ArcAd from '../features/ads/default';
import Headline from '../_helper_components/article/headline/default';
import NavBar from '../_helper_components/global/navBar/default';
import Footer from '../_helper_components/global/footer/default';
import Copyright from '../_helper_components/global/copyright/default';
import WeatherAlerts from '../_helper_components/global/weatherAlerts/default';

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

  return (
    <>
      <GlobalAdSlots />
      <NavBar articleURL={articleURL} headlines={headlines} comments={comments} type={type}/>
      <WeatherAlerts />
      <main>
        <div className="c-hp01-mp01 b-margin-top-d40-m20">
          <ArcAd staticSlot={'HP01'} />
          <ArcAd staticSlot={'MP01'} />
        </div>
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
