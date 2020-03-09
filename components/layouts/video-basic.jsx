/*  /components/layouts/video-basic.jsx  */
import React from 'react';
import { useAppContext } from 'fusion:context';
import GlobalAdSlots from '../_helper_components/global/ads/default';
import Headline from '../_helper_components/article/headline/default';
import NavBar from '../_helper_components/global/navBar/default';
import StickyNav from '../_helper_components/article/stickyNav/default';
import Footer from '../_helper_components/global/footer/default';

const VideoPageLayout = () => {
  const appContext = useAppContext();
  const { globalContent } = appContext;
  if (!globalContent) return null;

  const {
    content_elements: contentElements,
    promo_items: promoItems,
    headlines,
    comments,
    canonical_url: articleURL,
    type,
    credits,
    description,
    streams,
  } = globalContent || {};

  const basicItems = {
    promo_items: promoItems,
    type,
    credits,
    description,
    streams,
  };

  return (
    <>
      <GlobalAdSlots />
      <header className="c-nav">
        <NavBar />
        <StickyNav
          articleURL={articleURL}
          headlines={headlines}
          comments={comments}
          promoItems={promoItems}
          contentElements={contentElements}
        />
      </header>

      <main>
        <div className="c-header">
          <Headline headlines={headlines} basicItems={basicItems} />
        </div>
      </main>
      <Footer />
    </>
  );
};

export default VideoPageLayout;
