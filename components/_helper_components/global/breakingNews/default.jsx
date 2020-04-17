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

  const storyID = breakingNewsData && breakingNewsData.data.document && breakingNewsData.data.document.content_elements[0]
    ? breakingNewsData.data.document.content_elements[0].referent.id
    : '';

  const storyData = useContent({
    source: 'storyContent',
    query: { id: `${storyID}` },
  });

  let breakingHeadline;
  let breakingURL;
  let mainTitle;

  if (storyID) {
    breakingHeadline = storyData && storyData.headlines && storyData.headlines.basic;
    breakingURL = storyData && storyData.canonical_url;
    mainTitle = 'Breaking News';
  }

  if (breakingHeadline) {
    return <RenderBreakingNews breakingHeadline={breakingHeadline} breakingURL={breakingURL} mainTitle={mainTitle} />;
  } return <LiveVideo />;
};

export default BreakingNews;
