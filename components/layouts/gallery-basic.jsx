import React from 'react';
import { useAppContext } from 'fusion:context';
import GlobalAdSlots from '../_helper_components/global/ads/default';
import Headline from '../_helper_components/article/headline/default.jsx';
import NavBar from '../_helper_components/global/navBar/default';
import Gallery from '../features/gallery/default';
import Footer from '../_helper_components/global/footer/default';

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

  return (
    <>
      <GlobalAdSlots />
      <NavBar articleURL={articleURL} headlines={headlines} comments={comments}/>
      <main>
        <div className="c-header-gallery">
          <Headline headlines={headlines} basicItems={basicItems} />
        </div>
        <div className="c-main-gallery">
          <Gallery leafContentElements={contentElements} />
        </div>
      </main>
      <Footer />
    </>
  );
};

export default GalleryPageLayout;
