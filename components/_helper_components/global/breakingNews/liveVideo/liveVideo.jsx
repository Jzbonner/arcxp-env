import React from 'react';
import getProperties from 'fusion:properties';
import { useContent } from 'fusion:content';
import RenderBreakingNews from '../renderBreakingNews/renderBreakingNews';

const LiveVideo = () => {
  const { breakingLiveVideoID } = getProperties();

  const liveVideoData = useContent({
    source: 'list',
    query: { id: `${breakingLiveVideoID}` },
  });

  const { id: storyID } = liveVideoData && liveVideoData.data.document && liveVideoData.data.document.content_elements[0]
    ? liveVideoData.data.document.content_elements[0].referent
    : {};

  const videoData = useContent({
    source: 'storyContent',
    query: { id: `${storyID}` },
  });

  let breakingHeadline;
  let breakingURL;
  let mainTitle;

  if (videoData) {
    breakingHeadline = videoData && videoData.headlines && videoData.headlines.basic;
    breakingURL = videoData && videoData.canonical_url;
    mainTitle = 'Live Video';
  }

  if (breakingHeadline) {
    return <RenderBreakingNews breakingHeadline={breakingHeadline} breakingURL={breakingURL} mainTitle={mainTitle} />;
  }
  return null;
};

export default LiveVideo;
