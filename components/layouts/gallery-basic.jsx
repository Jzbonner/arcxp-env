import React from 'react';
import { useAppContext } from 'fusion:context';
import getProperties from 'fusion:properties';
import Headline from '../_helper_components/article/headline/default.jsx';
import StickyNav from '../_helper_components/article/stickyNav/default';
import NavBar from '../_helper_components/global/navBar/default';
import Gallery from '../features/gallery/default';
import Footer from '../_helper_components/global/footer/default';
import ArcAd from '../features/ads/default';
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
    subtype,
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

  const PG01 = () => <ArcAd staticSlot={'PG01'} />;
  const PG02 = () => <ArcAd staticSlot={'PG02'} />;
  const MPG01 = () => <ArcAd staticSlot={'MPG01'} />;

  return (
    <>
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
        <Gallery leafContentElements={contentElements} ads={[PG01, PG02, MPG01]} pageType={subtype} />
      </main>
      <Footer />
    </>
  );
};

export default GalleryPageLayout;
