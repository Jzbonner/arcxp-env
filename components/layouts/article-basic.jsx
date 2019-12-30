/*  /components/layouts/article-basic.jsx  */

import React from 'react';
import { useAppContext } from 'fusion:context';
import './article-basic.scss';
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

  const { by: authorData } = credits || {};

  if (globalContent.promo_items) {
    basicItems = globalContent.promo_items.basic;
  }

  return (
    <>
      <header>
        <div className="breaking-news placeholder">
          <div className="container-header">Breaking News</div>
        </div>
        <div className="header">
          <div className="container-header">
            <div className="logo placeholder">Logo</div>
            <div className="header-nav placeholder">
              <nav className="menu placeholder">Menu</nav>
              <div className="weather placeholder">Weather</div>
              <div className="log-in placeholder">Log In</div>
            </div>
            <div className="subscribe placeholder">Support Local Journalism. Subscribe today for 99¢.</div>
          </div>
        </div>
      </header>

      <main>
        <div className="container-headline">
          <Headline headlines={headlines} basicItems={basicItems} />
        </div>

        <article>
          <div className="container-article">
            <SubHeadline subheadlines={subheadlines} />
            <div className="flex-row flex-center">
              <SectionLabel label={label} taxonomy={taxonomy} />
              <TimeStamp firstPublishDate={firstPublishDate} displayDate={displayDate} />
            </div>
            <div className="flex-row flex-center">
              <Byline by={authorData} />
            </div>

            <ContentElements contentElements={contentElements} stopIndex="1" />
            <div className="flex-row">
              <ContentElements contentElements={contentElements} startIndex="1" stopIndex="8" />
              <div className="right-rail rpo01">RP01 Container</div>
            </div>
          </div>

          <div className="flex-row flex-center placeholder fullwidth-ad">Full Width Ad Container</div>

          <div className="container-article">
            {contentElements.length > 8 && (
              <div className="flex-row">
                <ContentElements contentElements={contentElements} startIndex="8" />
                <div className="right-rail rpo09">RP09 Container</div>
              </div>
            )}
            <div className="placeholder taboola">Taboola</div>
          </div>
        </article>
      </main>

      <footer className="footer placeholder">
        <div className="container">Footer</div>
      </footer>
    </>
  );
};

export default StoryPageLayout;
