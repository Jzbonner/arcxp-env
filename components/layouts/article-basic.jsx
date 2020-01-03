/*  /components/layouts/article-basic.jsx  */

import React from 'react';
import { useAppContext } from 'fusion:context';
import TimeStamp from '../_helper_components/article/timestamp/default';
import Byline from '../_helper_components/article/byline/default';
import ContentElements from '../_helper_components/article/contentElements/default';
import Headline from '../features/article/headline/default';
import SubHeadline from '../_helper_components/article/subheadline/default';
import SectionLabel from '../_helper_components/global/sectionLabel/default';

const StoryPageLayout = () => {
  const appContext = useAppContext();
  const { globalContent } = appContext;

  if (!globalContent) return null;
  let basicItems;

  const {
    first_publish_date: firstPublishDate,
    display_date: displayDate,
    content_elements: contentElements,
    headlines,
    label,
    taxonomy,
    subheadlines,
    credits,
  } = globalContent || {};

  // console.log(globalContent);

  const { by: authorData } = credits || {};

  if (globalContent.promo_items) {
    basicItems = globalContent.promo_items.basic;
  }

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
          <section className="c-article">
            <ContentElements contentElements={contentElements} stopIndex="1" />

            <div className="b-flexRow">
              <ContentElements contentElements={contentElements} startIndex="1" stopIndex="8" />

              <aside className="c-rightRail c-rp01">RP01 Container</aside>
            </div>
          </section>

          <div className="b-placeholder b-flexRow b-flexCenter c-fullWidthAd">Full Width Ad Container</div>

          <section className="c-article">
            {contentElements.length > 8 && (
              <div className="b-flexRow">
                <ContentElements contentElements={contentElements} startIndex="8" />
                <div className="c-rightRail c-rp09">RP09 Container</div>
              </div>
            )}
            <div className="b-placeholder c-taboola">Taboola</div>
          </section>
        </article>
      </main>

      <footer className="b-placeholder c-footer">Footer</footer>
    </>
  );
};

export default StoryPageLayout;
