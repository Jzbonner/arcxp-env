import React from 'react';
import PropTypes from 'prop-types';

import ArcAd from '../../features/ads/default';
import Footer from '../global/footer/default';
import NavBar from '../global/navBar/default';
import StickyNav from '../article/stickyNav/default';
import Section from '../article/section/Section';

import '../../../src/styles/container/_article-basic.scss';
import '../../../src/styles/base/_utility.scss';


const FlatPage = ({ globalContent }) => {
  if (!globalContent) return null;
  const {
    content_elements: contentElements,
    headlines,
    comments,
    taxonomy,
    canonical_url: articleURL,
  } = globalContent || {};

  const { tags = [] } = taxonomy || {};

  const noAds = tags.some(tag => tag.text === 'no-ads');
  const noRightRail = tags.some(tag => tag.text === 'no-right-rail');

  const RP01StoryDesktop = () => (noAds ? null : <ArcAd staticSlot={'RP01-Story-Desktop'} />);

  const filteredContentElements = contentElements.filter(element => element && element.type && element.type === 'raw_html');

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
        <article>
          {
            !noAds
            && <div className="c-hp01-mp01">
              <ArcAd staticSlot={'HP01'} />
              <ArcAd staticSlot={'MP01'} />
            </div>
          }

          {
            !noRightRail
            && <Section
            elements={filteredContentElements}
            rightRail={{ ad: RP01StoryDesktop }}
            />
          }

          {
            noRightRail
            && <Section
              elements={filteredContentElements}
              fullWidth={true}
            />
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
