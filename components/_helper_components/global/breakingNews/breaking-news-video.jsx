/* eslint-disable no-console */
import React, { useState } from 'react';
import getProperties from 'fusion:properties';
import { useContent } from 'fusion:content';
import { useFusionContext } from 'fusion:context';
import get from 'lodash/get';
import fetchEnv from '../utils/environment.js';
import './default.scss';

const BreakingNewsVideo = () => {
  const [isVisible, setVisibility] = useState(true);
  const hideBar = () => {
    setVisibility(false);
  };
  const fusionContext = useFusionContext();
  const { arcSite } = fusionContext;
  const currentEnv = fetchEnv();
  const {
    breakingLiveVideoID,
    breakingLiveVideoID_sandbox: liveVideoSandbox,
  } = getProperties(arcSite);

  const newsData = useContent({
    source: 'breaking-news-video-alert',
    query: {
      id: currentEnv === 'prod' ? breakingLiveVideoID : liveVideoSandbox,
      from: 0,
      size: 1,
      arcSite,
    },
  });

  const [story] = get(newsData, 'content_elements', []);

  if (story) {
    const headline = get(story, 'headlines.basic', '');
    const url = get(story, 'canonical_url', '');
    return (
      <div className={`c-breakingNews ${!isVisible ? 'is-hidden' : ''}`}>
        <a href={url} className="breakingURL">
          <h2 className="c-breakingNews-heading">Live Video</h2>
          <h2 className="c-breakingNews-title">{headline}</h2>
        </a>
        <span className="c-breakingNews-hide" onClick={hideBar} />
      </div>
    );
  }
  return null;
};

export default BreakingNewsVideo;
