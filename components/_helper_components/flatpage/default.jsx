import React from 'react';
import PropTypes from 'prop-types';

import Footer from '../global/footer/default';
import Copyright from '../global/copyright/default';
import ArcAd from '../../features/ads/default';
import Section from '../article/section/Section';
import GlobalAdSlots from '../global/ads/default';
import TopNavBreakingNews from '../global/navBar/TopNavBreakingNews/default';

import '../../../src/styles/base/_utility.scss';
import '../../../src/styles/container/_article-basic.scss';
import './default.scss';

const FlatPage = ({ globalContent, noHeaderAndFooter }) => {
  if (!globalContent) return null;
  const {
    headlines,
    comments,
    taxonomy,
    type,
    subtype,
    canonical_url: articleURL,
    content_elements: contentElements,
  } = globalContent || {};

  const { tags = [] } = taxonomy || {};

  // Both checks return true if the tag is present and false if not.
  const hasNoAdsTag = tags.some(tag => tag && tag.text && tag.text.toLowerCase() === 'no-ads');
  const hasNoRightRailTag = tags.some(tag => tag && tag.text && tag.text.toLowerCase() === 'no-right-rail');

  const filteredContentElements = contentElements.filter(element => element && element.type && element.type === 'raw_html');

  return (
    <>
      { !hasNoAdsTag && <GlobalAdSlots /> }
      {!noHeaderAndFooter && (
        <TopNavBreakingNews articleURL={articleURL} headlines={headlines} comments={comments} type={type} subtype={subtype} noAds={hasNoAdsTag} />
      )}
      <main className="c-flatpage b-sectionHomeMaxWidth">
        <article className='float-none'>
          {
            !hasNoAdsTag
            && <div className="c-hp01-mp01">
              <ArcAd staticSlot={'HP01'} />
              <ArcAd staticSlot={'MP01'} />
            </div>
          }

          {
            (hasNoRightRailTag || hasNoAdsTag)
            && <Section
              elements={filteredContentElements}
              fullWidth={true}
            />
          }

          {
            !hasNoRightRailTag && !hasNoAdsTag
            && <Section
              elements={filteredContentElements}
            />
          }

          {
            !hasNoRightRailTag && !hasNoAdsTag
            && <div className="c-hp05-mp05">
              <ArcAd staticSlot={'HP05-FlatPage'} />
              <ArcAd staticSlot={'MP05'} />
            </div>
          }
        </article>
      </main>
      {!noHeaderAndFooter && <>
        <Footer />
        <Copyright />
      </>}
    </>
  );
};

FlatPage.propTypes = {
  globalContent: PropTypes.object,
  noHeaderAndFooter: PropTypes.bool,
};

export default FlatPage;
