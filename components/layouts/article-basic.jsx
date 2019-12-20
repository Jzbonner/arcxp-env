/*  /components/layouts/article-basic.jsx  */

import React from 'react';
import { useAppContext } from 'fusion:context';
import TimeStamp from '../_helper_components/article/timestamp/default';
import Byline from '../_helper_components/article/byline/default';
import ContentElements from '../_helper_components/article/contentElements/default';
import Headline from '../features/article/headline/default';
import SubHeadline from '../_helper_components/article/subheadline/default';

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
    subheadlines,
    credits,
  } = globalContent || {};
  const { by: authorData } = credits || {};

  if (globalContent.promo_items) {
    basicItems = globalContent.promo_items.basic;
  }

  return <>
    <header>
      <Headline headlines={headlines} basicItems={basicItems} />
      <div>
        <SubHeadline subheadlines={subheadlines}/>
      </div>
      <TimeStamp
        firstPublishDate={ firstPublishDate }
        displayDate={ displayDate }
      />
      <Byline by={ authorData } />
    </header>
    <article>
      content
      <ContentElements
        contentElements={contentElements}
      />
    </article>
  </>;
};

export default StoryPageLayout;
