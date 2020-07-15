/* eslint-disable no-console */
import React, { useState } from 'react';
import getProperties from 'fusion:properties';
import { useContent } from 'fusion:content';
import { useFusionContext } from 'fusion:context';
import fetchEnv from '../utils/environment.js';
import './default.scss';

const BreakingNews = () => {
  const [isVisible, setVisibility] = useState(true);
  const hideBar = () => {
    setVisibility(false);
  };
  const fusionContext = useFusionContext();
  const { arcSite } = fusionContext;
  const currentEnv = fetchEnv();
  const {
    breakingNewsID_sandbox: breakingNewsSandbox,
    breakingLiveVideoID_sandbox: liveVideoSandbox,
    breakingNewsID,
    breakingLiveVideoID,
  } = getProperties(arcSite);

  const newsData = useContent({
    source: 'breaking-news-video-alert',
    query: {
      breakingNewsID: currentEnv === 'prod' ? breakingNewsID : breakingNewsSandbox,
      breakingLiveVideoID: currentEnv === 'prod' ? breakingLiveVideoID : liveVideoSandbox,
      arcSite,
    },
  });

  const { url, headline, typeOfHeadline } = newsData || {};

  if (url && headline && typeOfHeadline) {
    return (
      <div className={`c-breakingNews ${!isVisible ? 'is-hidden' : ''}`}>
        <a href={url} className="breakingURL" />
        <span className="c-breakingNews-hide" onClick={hideBar} />
        <h2 className="c-breakingNews-heading">{headline}</h2>
        <h2 className="c-breakingNews-content">{typeOfHeadline}</h2>
      </div>
    );
  }
  return null;
};

export default BreakingNews;
