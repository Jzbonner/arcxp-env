/*  /components/layouts/article-basic.jsx  */

import React from 'react';
import { useAppContext } from 'fusion:context';
import TimeStamp from '../_helper_components/article/timestamp/default';
import Byline from '../_helper_components/article/byline/default';
import Headline from '../features/article/headline/default';
import SubHeadline from '../_helper_components/article/subheadline/default';
import SectionLabel from '../_helper_components/global/sectionLabel/default';
import Section from '../_helper_components/article/section/Section';

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

  // console.log(globalContent);

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
          <Section
            elements={contentElements}
            stopIndex={10}
            rightRailAd={ExampleAdComponent}
            insertedAds={[{ insertAfterParagraph: 3, ad: ExampleAdInsertion1 }, { insertAfterParagraph: 5, ad: ExampleAdInsertion2 }]}
          />

          <div className="b-placeholder b-flexRow b-flexCenter c-fullWidthAd">Full Width Ad Container</div>

          <Section
            elements={contentElements}
            startIndex={10}
            rightRailAd={ExampleAdComponent}
            insertedAds={[{ insertAfterParagraph: 12, ad: ExampleAdInsertion1 }, { insertAfterParagraph: 15, ad: ExampleAdInsertion2 }]}
          />
        </article>
      </main>

      <footer className="b-placeholder c-footer">Footer</footer>
    </>
  );
};

export default StoryPageLayout;
