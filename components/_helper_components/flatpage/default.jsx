import React from 'react';
import PropTypes from 'prop-types';

import ArcAd from '../../layouts/article-basic';
import Footer from '../global/footer/default';
import NavBar from '../global/navBar/default';
import StickyNav from '../article/stickyNav/default';

import '../../../src/styles/container/_article-basic.scss';
import '../../../src/styles/base/_utility.scss';


const FlatPage = ({ globalContent }) => {
  if (!globalContent) return null;
  const {
    first_publish_date: firstPublishDate,
    display_date: displayDate,
    content_elements: contentElements,
    promo_items: promoItems,
    subtype,
    headlines,
    label,
    comments,
    taxonomy,
    canonical_url: articleURL,
    subheadlines,
    credits,
    type,
  } = globalContent || {};

  const { tags = [] } = taxonomy || {};

  const noAds = tags.some(tag => tag.text === 'no-ads');
  const noRightRail = tags.some(tag => tag.text === 'no-right-rail');

  return (
    <>
      <header className="c-nav">
        <NavBar/>
        <StickyNav
          articleURL={articleURL}
          headlines={headlines}
          comments={comments}
        />
      </header>
      <main>
        <header className="b-margin-bottom-d30-m20">

        </header>

        <article>
          { !noAds
          && <div className="c-hp01-mp01">
            <ArcAd staticSlot={'HP01'} />
            <ArcAd staticSlot={'MP01'} />
          </div> }
          <h2>Hi! Im a flatpage!!!</h2>
        </article>
      </main>

      <Footer />
    </>
  );
};

FlatPage.propTypes = {
  globalContent: PropTypes.object,
};

export default FlatPage;
