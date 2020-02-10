/*  /components/layouts/article-basic.jsx  */
import React from 'react';
import { useAppContext } from 'fusion:context';
import Headline from '../_helper_components/article/headline/default.jsx';
import StickyNav from '../_helper_components/article/stickyNav/default';
import BreakingNews from '../_helper_components/global/breakingNews/default';
import Header from '../_helper_components/global/header/default';
import Footer from '../_helper_components/global/footer/default';
import '../../src/styles/container/_article-basic.scss';

const VideoStoryPageLayout = () => {
  const appContext = useAppContext();
  const { globalContent } = appContext;
  if (!globalContent) return null;

  const {
    content_elements: contentElements,
    promo_items: promoItems,
    headlines,
    comments,
    canonical_url: articleURL,
  } = globalContent || {};

  const { basic: basicItems } = promoItems || {};

  return (
    <>
      <header>
        <BreakingNews />

        <Header />

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
      <Footer/>
    </>
  );
};

export default VideoStoryPageLayout;
