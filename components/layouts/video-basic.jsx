/*  /components/layouts/video-basic.jsx  */
import React from 'react';
import { useAppContext } from 'fusion:context';
import getProperties from 'fusion:properties';
import Headline from '../_helper_components/article/headline/default.jsx';
import NavBar from '../_helper_components/global/navBar/default';
import Footer from '../_helper_components/global/footer/default';
import '../../src/styles/container/_article-basic.scss';

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

  const { featuredVideoPlayerRules, maxTabletViewWidth } = getProperties();

  return (
    <>
      <header className="c-nav">
        <NavBar
          articleURL={articleURL}
          headlines={headlines}
          comments={comments}
          promoItems={promoItems}
          contentElements={contentElements}/>
      </header>

      <main>
        <div className="c-header">
          <Headline
            headlines={headlines}
            basicItems={basicItems}
            featuredVideoPlayerRules={featuredVideoPlayerRules}
            maxTabletViewWidth={maxTabletViewWidth}
          />
        </div>
      </main>
      <Footer/>
    </>
  );
};

export default VideoPageLayout;
