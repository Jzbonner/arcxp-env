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
    : 'NYEMCXC2UFCG3D6KSMDOZJAFCM';
  // Temporary default value of a story that is verified to exist
  // Without this valid value, the Content API inside the below hook will throw an Error,
  // even if '' is passed.This makes the component dismount.
  // Enclosing the below hook in a conditional is not an option because React will throw an error
  // if the same number of hooks don't run on every render

  const storyData = useContent({
    source: 'storyContent',
    query: { id: `${storyID}` },
  });

  if (breakingNewsData && breakingNewsData.data.booked > 0) {
    if (storyData) {
      const breakingHeadline = storyData && storyData.headlines && storyData.headlines.basic;
      const breakingURL = storyData && storyData.canonical_url;
      const mainTitle = 'Breaking News';

      return <RenderBreakingNews breakingHeadline={breakingHeadline} breakingURL={breakingURL} mainTitle={mainTitle} />;
    }
  }
  if (breakingNewsData && breakingNewsData.data.booked === 0) {
    return <LiveVideo />;
  }
  return null;
};

export default BreakingNews;
