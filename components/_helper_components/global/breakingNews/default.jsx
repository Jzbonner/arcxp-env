import React from 'react';
import getProperties from 'fusion:properties';
import { useContent } from 'fusion:content';
import LiveVideo from './liveVideo/liveVideo';
import RenderBreakingNews from './renderBreakingNews/renderBreakingNews';

const BreakingNews = () => {
  const { breakingNewsID } = getProperties();

  const breakingNewsData = useContent({
    source: 'collections-api',
    query: { id: `${breakingNewsID}` },
  });

  const breakingNewsItem = breakingNewsData && breakingNewsData.content_elements[0] ? breakingNewsData.content_elements : false;
  let breakingHeadline;
  let breakingURL;
  let mainTitle;

  if (breakingNewsItem) {
    breakingHeadline = breakingNewsData && breakingNewsItem[0] ? breakingNewsItem[0].headlines.basic : '';
    breakingURL = breakingNewsItem && breakingNewsItem[0] ? breakingNewsItem[0].canonical_url : '';
    mainTitle = 'Breaking News';
  }

  if (breakingHeadline) {
    return <RenderBreakingNews breakingHeadline={breakingHeadline} breakingURL={breakingURL} mainTitle={mainTitle} />;
  }
  return <LiveVideo />;
};

export default BreakingNews;
