/*  /components/layouts/article-basic.jsx  */
import React from 'react';
import { useAppContext } from 'fusion:context';
import getProperties from 'fusion:properties';
import GlobalAdSlots from '../_helper_components/global/ads/default';
import TimeStamp from '../_helper_components/article/timestamp/default.jsx';
import Byline from '../_helper_components/article/byline/default.jsx';
import Headline from '../_helper_components/article/headline/default.jsx';
import SubHeadline from '../_helper_components/article/subheadline/default.jsx';
import SectionLabel from '../_helper_components/global/sectionLabel/default.jsx';
import Section from '../_helper_components/article/section/Section';
import TaboolaFeed from '../features/taboolaFeed/default';
import StickyNav from '../_helper_components/article/stickyNav/default';
import Nativo from '../_helper_components/article/nativo/nativo.jsx';
import BlogAuthor from '../_helper_components/article/blogAuthor/BlogAuthor';
import Gallery from '../features/gallery/default.jsx';
import NavBar from '../_helper_components/global/navBar/default';
import BreakingNews from '../_helper_components/global/breakingNews/default';
import Footer from '../_helper_components/global/footer/default';
import ArcAd from '../features/ads/default';
import { paragraphCounter } from './_helper_functions/Paragraph';
import '../../src/styles/container/_article-basic.scss';
import '../../src/styles/base/_utility.scss';
import filterContentElements from './_helper_functions/article/filterContentElements';
import ConnextEndOfStory from '../_helper_components/global/connextEndOfStory/default';
import FlatPage from '../_helper_components/flatpage/default';

const RP01StoryDesktop = () => <ArcAd staticSlot={'RP01-Story-Desktop'} />;
const RP01StoryTablet = () => <ArcAd staticSlot={'RP01-Story-Tablet'} />;
const MP02 = () => <ArcAd staticSlot={'MP02'} />;
const MP03 = () => <ArcAd staticSlot={'MP03'} />;

const { featuredVideoPlayerRules, maxTabletViewWidth } = getProperties();
const RP09StoryDesktop = () => <ArcAd staticSlot={'RP09-Story-Desktop'} />;
const RP09StoryTablet = () => <ArcAd staticSlot={'RP09-Story-Tablet'} />;

const start = 3;

const StoryPageLayout = () => {
  const appContext = useAppContext();
  const { globalContent } = appContext;

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

  if (subtype === 'Flatpage') return <FlatPage />;

  const { by: authorData } = credits || {};
  const { basic: basicItems } = promoItems || {};
  // destructured it in two parts due to page getting broken when hide_timestamp doesn't exist
  const { hide_timestamp: hideTimestamp } = label || {};
  const { text: isHideTimestampTrue } = hideTimestamp || {};
  const filteredContentElements = filterContentElements({ contentElements });
  const maxNumberOfParagraphs = paragraphCounter(filteredContentElements);
  const stop = maxNumberOfParagraphs === 4 ? 4 : 5;

  const ConnextEndStory = () => <ConnextEndOfStory />;
  const BlogAuthorComponent = () => <BlogAuthor subtype={subtype} authorData={authorData} />;
  const interscrollerPlaceholder = () => <div className='story-interscroller__placeholder full-width c-clear-both'></div>;

  return (
    <>
      <GlobalAdSlots />
      <BreakingNews />
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
          <div className="c-header">
            <Headline
              headlines={headlines}
              basicItems={basicItems}
              featuredVideoPlayerRules={featuredVideoPlayerRules}
              maxTabletViewWidth={maxTabletViewWidth}
            />
          </div>
          <div className="b-margin-bottom-d15-m10 c-label-wrapper b-pageContainer">
            <SectionLabel label={label} taxonomy={taxonomy} />
            <TimeStamp
              firstPublishDate={firstPublishDate}
              displayDate={displayDate}
              isHideTimestampTrue={isHideTimestampTrue}
            />
          </div>
          <div className="b-flexRow b-flexCenter b-pageContainer">
            <Byline by={authorData} />
          </div>
          <div className="b-flexRow b-flexCenter b-margin-bottom-d15-m10 b-pageContainer">
            <SubHeadline subheadlines={subheadlines} />
          </div>
        </header>

        <article>
          <div className="c-hp01-mp01">
            <ArcAd staticSlot={'HP01'} />
            <ArcAd staticSlot={'MP01'} />
          </div>
          <Section
            elements={filteredContentElements}
            stopIndex={1}
            fullWidth={true}
          />
          <Section
            elements={filteredContentElements}
            startIndex={1}
            stopIndex={3}
            rightRail={{ insertBeforeParagraph: 2, ad: RP01StoryDesktop }}
            insertedAds={[{ insertAfterParagraph: 2, adArray: [RP01StoryTablet, MP02] }]}
          />
          {maxNumberOfParagraphs === 3 && interscrollerPlaceholder()}
          <Nativo
            elements={filteredContentElements}
            displayIfAtLeastXParagraphs={4}
            controllerClass="story-nativo_placeholder--moap"
          />
          <Section
            elements={filteredContentElements}
            startIndex={start}
            stopIndex={stop} />
          {maxNumberOfParagraphs >= 4 && interscrollerPlaceholder()}
          <Section
            elements={filteredContentElements}
            startIndex={stop}
            rightRail={{ insertBeforeParagraph: 8, ad: RP09StoryDesktop }}
            insertedAds={[{ insertAfterParagraph: 8, adArray: [RP09StoryTablet, MP03] }]}
            insertAtSectionEnd={[BlogAuthorComponent, ConnextEndStory]}
          />

          <Nativo
            elements={filteredContentElements}
            controllerClass="story-nativo_placeholder--boap"
          />
          <div className="c-taboola">
            <TaboolaFeed type={type} />
          </div>
        </article>
       {(!basicItems)
          || (basicItems
            && basicItems.type
            && basicItems.type !== 'gallery') ? <Gallery contentElements={filteredContentElements} /> : null}
      </main>
      <Footer />
    </>
  );
};
export default StoryPageLayout;
