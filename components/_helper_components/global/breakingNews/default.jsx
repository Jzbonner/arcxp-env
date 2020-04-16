import React from 'react';
import getProperties from 'fusion:properties';
import { useContent } from 'fusion:content';
import LiveVideo from './liveVideo/liveVideo';
import RenderBreakingNews from './renderBreakingNews/renderBreakingNews';

const BreakingNews = () => {
  const { breakingNewsID } = getProperties();

  const breakingNewsData = useContent({
    source: 'list',
    query: { id: `${breakingNewsID}` },
  });

  const { type: itemType } = breakingNewsData && breakingNewsData.data.document && breakingNewsData.data.document.content_elements[0]
    ? breakingNewsData.data.document.content_elements[0].referent
    : {};
  const { id: storyID } = breakingNewsData && breakingNewsData.data.document && breakingNewsData.data.document.content_elements[0]
    ? breakingNewsData.data.document.content_elements[0].referent
    : {};

  const storyData = useContent({
    source: 'draft-api',
    query: { id: `${storyID}`, type: `${itemType}` },
  });

  console.log('DRAFT API', storyData);
  const { content_elements: contentElements } = storyData || {};
  const [breakingNewsItem] = contentElements || [];
  let breakingHeadline;
  let breakingURL;
  let mainTitle;

  if (breakingNewsItem) {
    breakingHeadline = breakingNewsItem && breakingNewsItem.headlines && breakingNewsItem.headlines.basic;
    breakingURL = breakingNewsItem && breakingNewsItem.canonical_url;
    mainTitle = 'Breaking News';
  }

  if (breakingHeadline) {
    return <RenderBreakingNews breakingHeadline={breakingHeadline} breakingURL={breakingURL} mainTitle={mainTitle} />;
  }
  return <LiveVideo />;
};

export default BreakingNews;
