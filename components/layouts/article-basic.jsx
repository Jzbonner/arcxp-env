/*  /components/layouts/article-basic.jsx  */
import React from 'react';
import { useAppContext } from 'fusion:context';
import getProperties from 'fusion:properties';
import TimeStamp from '../_helper_components/article/timestamp/default.jsx';
import Byline from '../_helper_components/article/byline/default.jsx';
import Headline from '../_helper_components/article/headline/default.jsx';
import SubHeadline from '../_helper_components/article/subheadline/default.jsx';
import SectionLabel from '../_helper_components/global/sectionLabel/default.jsx';
import Section from '../_helper_components/article/section/Section.jsx';
import TaboolaFeed from '../features/taboolaFeed/default';
import StickyNav from '../_helper_components/article/stickyNav/default';
import Nativo from '../_helper_components/article/nativo/nativo.jsx';
import BlogAuthor from '../_helper_components/article/blogAuthor/BlogAuthor';
import Gallery from '../features/gallery/default.jsx';
import BreakingNews from '../_helper_components/global/breakingNews/default';
import Header from '../_helper_components/global/header/default';
import Footer from '../_helper_components/global/footer/default';
import '../../src/styles/container/_article-basic.scss';
import ArcAd from '../features/ads/default';

const RP01StoryDesktop = () => <ArcAd staticSlot={'RP01-Story-Desktop'} />;
const RP01StoryTablet = () => <ArcAd staticSlot={'RP01-Story-Tablet'} />;
const MP02 = () => <ArcAd staticSlot={'MP02'} />;

const { featuredVideoPlayerRules, maxTabletViewWidth } = getProperties();
const RP09StoryDesktop = () => <ArcAd staticSlot={'RP09-Story-Desktop'} />;
const RP09StoryTablet = () => <ArcAd staticSlot={'RP09-Story-Tablet'} />;

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
  const { by: authorData } = credits || {};
  const { basic: basicItems } = promoItems || {};
  // destructured it in two parts due to page getting broken when hide_timestamp doesn't exist
  const { hide_timestamp: hideTimestamp } = label || {};
  const { text: isHideTimestampTrue } = hideTimestamp || {};

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
            <TimeStamp firstPublishDate={firstPublishDate} displayDate={displayDate} isHideTimestampTrue={isHideTimestampTrue} />
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
          <Section elements={contentElements} stopIndex={1} />
          <Section
            elements={contentElements}
            startIndex={1}
            stopIndex={3}
            rightRailAd={RP01StoryDesktop}
            insertedAds={[{ insertAfterParagraph: 2, adArray: [RP01StoryTablet, MP02] }]}
          />
          <Nativo elements={contentElements} displayIfAtLeastXParagraphs={4} controllerClass="story-nativo_placeholder--moap" />

          <Section
            elements={contentElements}
            startIndex={3}
            rightRailAd={RP09StoryDesktop}
            insertedAds={[{ insertAfterParagraph: 7, adArray: [RP09StoryTablet] }]}
          />

          <BlogAuthor subtype={subtype} authorData={authorData} />
          <Nativo elements={contentElements} controllerClass="story-nativo_placeholder--boap" />
          <div className="c-taboola">
            <TaboolaFeed type={type} />
          </div>
        </article>
        <Gallery contentElements={contentElements} />
      </main>
      <Footer />
    </>
  );
};

export default StoryPageLayout;
