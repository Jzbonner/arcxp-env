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

  const RP01StoryFlatPage = () => <ArcAd staticSlot={'RP01-Story-FlatPage'} key={'RP01-Story-FlatPage'} />;

  // Both checks return true if the tag is present and false if not.
  const noAds = tags.some(tag => tag && tag.text && tag.text.toLowerCase() === 'no-ads');
  const noRightRail = tags.some(tag => tag && tag.text && tag.text.toLowerCase() === 'no-right-rail');

  const filteredContentElements = contentElements.filter(element => element && element.type && element.type === 'raw_html');

  return (
    <>
      { !noAds && <GlobalAdSlots /> }
      {!noHeaderAndFooter && (
        <TopNavBreakingNews articleURL={articleURL} headlines={headlines} comments={comments} type={type} subtype={subtype} noAds={noAds} />
      )}
      <main className="c-flatpage b-sectionHomeMaxWidth">
        <article>
          {
            !noAds
            && <div className="c-hp01-mp01">
              <ArcAd staticSlot={'HP01'} />
              <ArcAd staticSlot={'MP01'} />
            </div>
          }

          {
            (noRightRail || noAds)
            && <Section
              elements={filteredContentElements}
              fullWidth={true}
            />
          }

          {
            !noRightRail && !noAds
            && <Section
              elements={filteredContentElements}
              rightRail={{ insertBeforeParagraph: 1, ad: RP01StoryFlatPage }}
            />
          }

          {
            !noRightRail && !noAds
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
