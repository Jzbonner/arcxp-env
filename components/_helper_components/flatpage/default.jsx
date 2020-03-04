import React from 'react';
import PropTypes from 'prop-types';

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
        <h2>Hi! Im a flatpage!!!</h2>
      </main>

      <Footer />
    </>
  );
};

FlatPage.propTypes = {
  globalContent: PropTypes.object,
};

export default FlatPage;
