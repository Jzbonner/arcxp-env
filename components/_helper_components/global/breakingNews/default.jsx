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

  const { content_elements: contentElements } = breakingNewsData || {};
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
