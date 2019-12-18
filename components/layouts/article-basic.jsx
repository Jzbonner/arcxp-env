/*  /components/layouts/article-basic.jsx  */

import React from 'react';
import { useAppContext } from 'fusion:context';
import TimeStamp from '../_helper_components/article/timestamp/default';
import Byline from '../_helper_components/article/byline/default';

const StoryPageLayout = () => {
  const appContext = useAppContext();
  const { globalContent } = appContext;

  if (!globalContent) return null;

  const {
    first_publish_date: firstPublishDate,
    display_date: displayDate,
    credits: { by = [] },
  } = globalContent || {};

  return <>
    <header>
      <h1>
        Heading
      </h1>
      <div>
        lead image
      </div>
      <div>
        sub heading
      </div>
      <TimeStamp
        firstPublishDate={ firstPublishDate }
        displayDate={ displayDate }
      />
      <Byline by={ by }/>
    </header>
    <article>
      content
    </article>
  </>;
};

export default StoryPageLayout;
