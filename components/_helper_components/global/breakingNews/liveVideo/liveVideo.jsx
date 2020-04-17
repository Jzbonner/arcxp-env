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

  const videoID = liveVideoData && liveVideoData.data.document && liveVideoData.data.document.content_elements[0]
    ? liveVideoData.data.document.content_elements[0].referent.id
    : '';

  const videoData = useContent({
    source: 'storyContent',
    query: { id: `${videoID}` },
  });

  let breakingHeadline;
  let breakingURL;
  let mainTitle;

  if (videoID) {
    breakingHeadline = videoData && videoData.headlines && videoData.headlines.basic;
    breakingURL = videoData && videoData.canonical_url;
    mainTitle = 'Live Video';
  }
  if (breakingHeadline) {
    return <RenderBreakingNews breakingHeadline={breakingHeadline} breakingURL={breakingURL} mainTitle={mainTitle} />;
  } return null;
};

export default LiveVideo;
