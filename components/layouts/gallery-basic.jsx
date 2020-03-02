import React from 'react';
import { useAppContext } from 'fusion:context';
import getProperties from 'fusion:properties';
import GlobalAdSlots from '../_helper_components/global/ads/default';
import Headline from '../_helper_components/article/headline/default.jsx';
import StickyNav from '../_helper_components/article/stickyNav/default';
import NavBar from '../_helper_components/global/navBar/default';
import Gallery from '../features/gallery/default';
import Footer from '../_helper_components/global/footer/default';
import '../../src/styles/container/_article-basic.scss';

const GalleryPageLayout = () => {
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
    type,
    credits,
    description,
    streams,
  };

  const { featuredVideoPlayerRules, maxTabletViewWidth } = getProperties();

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
        <div>
          <Headline
            headlines={headlines}
            basicItems={basicItems}
            featuredVideoPlayerRules={featuredVideoPlayerRules}
            maxTabletViewWidth={maxTabletViewWidth}
          />
        </div>
        <Gallery leafContentElements={contentElements} />
      </main>
      <Footer />
    </>
  );
};

export default GalleryPageLayout;
