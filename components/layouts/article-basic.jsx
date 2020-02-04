/*  /components/layouts/article-basic.jsx  */
import React from 'react';
import { useAppContext } from 'fusion:context';
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
import NavBar from '../_helper_components/global/navBar/default';
import '../../src/styles/container/_article-basic.scss';

const ExampleAdComponent = () => <div className="railAd">RP01 Ad</div>;

const ExampleAdInsertion1 = () => <div className="b-placeholder insertedAd insertionAd1">Inserted Ad A</div>;
const ExampleAdInsertion2 = () => <div className="b-placeholder insertedAd insertionAs2">Inserted Ad B</div>;

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

  // const paragraphCount = paragraphCounter(contentElements);

  // with paragraphCount, we can now determine what ads are needed for the layout
  // console.log('paragraphCount', paragraphCount);

  return (
    <>
      <header>
        <div className="b-placeholder c-breakingNews">Breaking News</div>
        <NavBar
        />
          <div className="b-placeholder c-subscribe">Support Local Journalism. Subscribe today for 99¢.</div>
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
            <Headline headlines={headlines} basicItems={basicItems} />
          </div>
          <div className="b-flexRow b-flexCenter b-margin-bottom-d15-m10">
            <SectionLabel label={label} taxonomy={taxonomy} />
            <TimeStamp firstPublishDate={firstPublishDate} displayDate={displayDate} isHideTimestampTrue={isHideTimestampTrue} />
          </div>
          <div className="b-flexRow b-flexCenter">
            <Byline by={authorData} />
          </div>
          <SubHeadline subheadlines={subheadlines} />
        </header>

        <article>
          <Section elements={contentElements} stopIndex={1} />
          <Section elements={contentElements} startIndex={1} stopIndex={3} rightRailAd={ExampleAdComponent} />
          <Nativo elements={contentElements} displayIfAtLeastXParagraphs={4} controllerClass="story-nativo_placeholder--moap" />

          <Section
            elements={contentElements}
            startIndex={3}
            rightRailAd={ExampleAdComponent}
            insertedAds={[
              { insertAfterParagraph: 3, ad: ExampleAdInsertion1 },
              { insertAfterParagraph: 5, ad: ExampleAdInsertion2 },
            ]}
          />

          <BlogAuthor subtype={subtype} authorData={authorData} />
          <Nativo elements={contentElements} controllerClass="story-nativo_placeholder--boap" />
          <div className="c-taboola">
            <TaboolaFeed type={type} />
          </div>
        </article>
        <Gallery contentElements={contentElements} />
      </main>
      <footer className="b-placeholder c-footer">Footer</footer>
    </>
  );
};

export default StoryPageLayout;
