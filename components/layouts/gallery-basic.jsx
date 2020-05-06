import React from 'react';
import { useAppContext } from 'fusion:context';
import GlobalAdSlots from '../_helper_components/global/ads/default';
import Headline from '../_helper_components/article/headline/default.jsx';
import NavBar from '../_helper_components/global/navBar/default';
import Gallery from '../features/gallery/default';
import Footer from '../_helper_components/global/footer/default';
import Copyright from '../_helper_components/global/copyright/default';
import '../../src/styles/container/_article-basic.scss';

const GalleryPageLayout = () => {
  const appContext = useAppContext();
  const { globalContent } = appContext;
  if (!globalContent) return null;

  const {
    content_elements: contentElements,
    headlines,
    comments,
    canonical_url: articleURL,
    type,
    subtype,
    credits,
    description,
    streams,
    promo_items: promoItems,
  } = globalContent || {};

  const { basic } = promoItems || {};

  const basicItems = {
    type,
    credits,
    description,
    streams,
  };

  return (
    <>
      <GlobalAdSlots />
      <NavBar articleURL={articleURL} headlines={headlines} comments={comments} type={type} />
      <main>
        <div className="c-header-gallery">
          <Headline headlines={headlines} basicItems={basicItems} />
        </div>
        <div className="c-main-gallery">
          <Gallery leafContentElements={contentElements} promoItems={basic} pageType={subtype} />
        </div>
      </main>
      <Footer />
      <Copyright />
    </>
  );
};

export default GalleryPageLayout;
