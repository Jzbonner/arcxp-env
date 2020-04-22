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
    : 'NYEMCXC2UFCG3D6KSMDOZJAFCM';
  // Temporary default value of a story that is verified to exist
  // Without this valid value, the Content API inside the below hook will throw an Error,
  // even if '' is passed.This makes the component dismount.
  // Enclosing the below hook in a conditional is not an option because React will throw an error
  // if the same number of hooks don't run on every render

  const videoData = useContent({
    source: 'storyContent',
    query: { id: `${videoID}` },
  });

  if (videoData) {
    const breakingHeadline = videoData && videoData.headlines && videoData.headlines.basic;
    const breakingURL = videoData && videoData.canonical_url;
    const mainTitle = 'Live Video';

    if (breakingHeadline) {
      return <RenderBreakingNews breakingHeadline={breakingHeadline} breakingURL={breakingURL} mainTitle={mainTitle} />;
    }
  }
  return null;
};

export default LiveVideo;
