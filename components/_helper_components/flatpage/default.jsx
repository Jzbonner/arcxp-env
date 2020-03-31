import React from 'react';
import PropTypes from 'prop-types';

import Footer from '../global/footer/default';
import NavBar from '../global/navBar/default';
import ArcAd from '../../features/ads/default';
import Section from '../article/section/Section';
import GlobalAdSlots from '../global/ads/default';
import BreakingNews from '../global/breakingNews/default';

import '../../../src/styles/base/_utility.scss';
import '../../../src/styles/container/_article-basic.scss';
import './default.scss';

const FlatPage = ({ globalContent }) => {
  if (!globalContent) return null;
  const {
    headlines,
    comments,
    taxonomy,
    type,
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
      <BreakingNews/>
      <NavBar articleURL={articleURL} headlines={headlines} comments={comments} type={type}/>
      <main>
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
              <ArcAd staticSlot={'HP05'} />
              <ArcAd staticSlot={'MP05'} />
            </div>
          }
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
