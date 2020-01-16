/*  /components/layouts/article-basic.jsx  */

import React from 'react';
import { useAppContext } from 'fusion:context';
import TimeStamp from '../_helper_components/article/timestamp/default.jsx';
import Byline from '../_helper_components/article/byline/default.jsx';
import Headline from '../_helper_components/article/headline/default.jsx';
import SubHeadline from '../_helper_components/article/subheadline/default.jsx';
import SectionLabel from '../_helper_components/global/sectionLabel/default.jsx';
import Section from '../_helper_components/article/section/Section.jsx';
import Gallery from '../features/gallery/default.jsx';

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
    headlines,
    label,
    taxonomy,
    subheadlines,
    credits,
  } = globalContent || {};


  const { by: authorData } = credits || {};
  const { basic: basicItems } = promoItems || {};

  // const paragraphCount = paragraphCounter(contentElements);

  // with paragraphCount, we can now determine what ads are needed for the layout
  // console.log('paragraphCount', paragraphCount);

  return (
    <>
      <header>
        <div className="b-placeholder c-breakingNews">Breaking News</div>

        <div className="c-fixed-width">
          <div className="b-placeholder c-logo">Logo</div>
          <div className="b-placeholder c-headerNav">
            <nav className="b-placeholder c-headerNav-menu">Menu</nav>
            <div className="b-placeholder c-headerNav-weather">Weather</div>
            <div className="b-placeholder c-headerNav-logIn">Log In</div>
          </div>
          <div className="b-placeholder c-subscribe">Support Local Journalism. Subscribe today for 99¢.</div>
        </div>
      </header>

      <main>
        <header>
          <div className="c-fixed-width">
            <Headline headlines={headlines} basicItems={basicItems} />
          </div>
          <SubHeadline subheadlines={subheadlines} />
          <div className="b-flexRow b-flexCenter">
            <SectionLabel label={label} taxonomy={taxonomy} />
            <TimeStamp firstPublishDate={firstPublishDate} displayDate={displayDate} />
          </div>
          <div className="b-flexRow b-flexCenter">
            <Byline by={authorData} />
          </div>
        </header>

        <article>
          <Section elements={contentElements} stopIndex={1} />

          <div className="b-placeholder b-flexRow b-flexCenter c-fullWidthAd">Full Width Ad Container</div>

          <Section elements={contentElements} startIndex={1} stopIndex={5} rightRailAd={ExampleAdComponent} />

          <div className="b-placeholder b-flexRow b-flexCenter c-fullWidthAd">Full Width Ad Container</div>

          <Section
            elements={contentElements}
            startIndex={5}
            rightRailAd={ExampleAdComponent}
            insertedAds={[{ insertAfterParagraph: 12, ad: ExampleAdInsertion1 }, { insertAfterParagraph: 15, ad: ExampleAdInsertion2 }]}
          />
        </article>
      </main>
      <Gallery contentElements={contentElements} />
      <footer className="b-placeholder c-footer">Footer</footer>
    </>
  );
};

export default StoryPageLayout;
