/*  /components/layouts/article-basic.jsx  */

import React from 'react';
import { useAppContext } from 'fusion:context';
import TimeStamp from '../_helper_components/article/timestamp/default';
import ContentElement from '../_helper_components/article/contentElements/default';
import Headline from '../features/article/headline/default';

const StoryPageLayout = () => {
  const appContext = useAppContext();
  const { globalContent } = appContext;

  if (!globalContent) return null;

  const { first_publish_date: firstPublishDate, display_date: displayDate } = globalContent;

  return (
    <>
      <header>
        <Headline global={globalContent}/>
        <div>sub heading</div>
        <TimeStamp firstPublishDate={firstPublishDate} displayDate={displayDate} />
      </header>
      <article>
        <ContentElement global={globalContent}/>
      </article>
    </>
  );
};

export default StoryPageLayout;
