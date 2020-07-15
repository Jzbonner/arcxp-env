/* eslint-disable no-console */
import React, { useState } from 'react';
import getProperties from 'fusion:properties';
import { useContent } from 'fusion:content';
import { useFusionContext } from 'fusion:context';
import get from 'lodash.get';
import fetchEnv from '../utils/environment.js';
import './default.scss';

const BreakingNewsStory = () => {
  const [isVisible, setVisibility] = useState(true);
  const hideBar = () => {
    setVisibility(false);
  };
  const fusionContext = useFusionContext();
  const { arcSite } = fusionContext;
  const currentEnv = fetchEnv();
  const {
    breakingNewsID_sandbox: breakingNewsSandbox,
    breakingNewsID,
  } = getProperties(arcSite);

  const newsData = useContent({
    source: 'breaking-news-video-alert',
    query: {
      id: currentEnv === 'prod' ? breakingNewsID : breakingNewsSandbox,
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
        <a href={url} className="breakingURL" />
        <span className="c-breakingNews-hide" onClick={hideBar} />
        <h2 className="c-breakingNews-heading">{headline}</h2>
        <h2 className="c-breakingNews-content">Breaking News</h2>
      </div>
    );
  }
  return null;
};

export default BreakingNewsStory;
