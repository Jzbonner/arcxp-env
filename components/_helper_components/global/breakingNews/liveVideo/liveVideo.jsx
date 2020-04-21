import React from 'react';
import getProperties from 'fusion:properties';
import { useContent } from 'fusion:content';
import RenderBreakingNews from '../renderBreakingNews/renderBreakingNews';

const LiveVideo = () => {
  const { breakingLiveVideoID } = getProperties();

  const liveVideoData = useContent({
    source: 'collections-api',
    query: { id: `${breakingLiveVideoID}` },
  });

  const { content_elements: contentElements } = liveVideoData || {};
  const [liveVideoItem] = contentElements || [];
  let breakingHeadline;
  let breakingURL;
  let mainTitle;

  if (liveVideoItem) {
    breakingHeadline = liveVideoItem && liveVideoItem.headlines && liveVideoItem.headlines.basic;
    breakingURL = liveVideoItem && liveVideoItem.canonical_url;
    mainTitle = 'Live Video';
  }

  if (breakingHeadline) {
    return <RenderBreakingNews breakingHeadline={breakingHeadline} breakingURL={breakingURL} mainTitle={mainTitle} />;
  }
  return null;
};

export default LiveVideo;
