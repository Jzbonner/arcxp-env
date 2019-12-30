/*  /components/layouts/article-basic.jsx  */

import React from 'react';
import { useAppContext } from 'fusion:context';
import paragraphCounter from './_helper_functions/article/paragraphCounter';
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
console.log('contentElements', contentElements);
  const { by: authorData } = credits || {};
  const { basic: basicItems } = promoItems || {};

  const paragraphCount = paragraphCounter(contentElements);

  // with paragraphCount, we can now determine what ads are needed for the layout
  console.log('paragraphCount', paragraphCount);

  return (
    <>
      <header>
        <Headline headlines={headlines} basicItems={basicItems} />
        <div>
          <SubHeadline subheadlines={subheadlines} />
        </div>
        <div>
          <SectionLabel label={label} taxonomy={taxonomy} />
          <TimeStamp firstPublishDate={firstPublishDate} displayDate={displayDate} />
        </div>
        <Byline by={authorData} />
      </header>
      <article>
        <ContentElements contentElements={contentElements} />
      </article>
    </>
  );
};

export default StoryPageLayout;
