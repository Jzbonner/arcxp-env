/*  /components/layouts/article-basic.jsx  */

import React from 'react';
import { useAppContext } from 'fusion:context';
import TimeStamp from '../_helper_components/article/timestamp/default';
import ContentElements from '../_helper_components/article/contentElements/default';
import Headline from '../features/article/headline/default';

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
  } = globalContent;

  if (globalContent.promo_items) {
    basicItems = globalContent.promo_items.basic;
  }

  return <>
    <header>
      <Headline headlines={headlines} basicItems={basicItems} />
      <div>
        sub heading
      </div>
      <TimeStamp
        firstPublishDate={firstPublishDate}
        displayDate={displayDate}
      />
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
