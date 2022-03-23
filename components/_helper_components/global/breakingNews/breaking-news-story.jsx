/* eslint-disable no-console */
import React, { useState } from 'react';
import getProperties from 'fusion:properties';
import { useContent } from 'fusion:content';
import { useFusionContext } from 'fusion:context';
import get from 'lodash/get';
import fetchEnv from '../utils/environment.js';
import './default.scss';

const BreakingNewsStory = () => {
  const [isVisible, setVisibility] = useState(true);
  const fusionContext = useFusionContext();
  const { arcSite } = fusionContext;
  const currentEnv = fetchEnv();
  const {
    breakingNewsID_sandbox: breakingNewsSandbox,
    breakingNewsID,
    siteName,
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
  const { _id: collectionId } = newsData || {};
  const breakingNewsLSLookup = `dismissed_breaking_news_${siteName}_${currentEnv.toUpperCase()}`;
  const dismissedCollectionStorage = typeof window !== 'undefined' ? JSON.parse(window.localStorage.getItem(breakingNewsLSLookup)) : null;

  const saveCollection = () => {
    if (!dismissedCollectionStorage) {
      const initialCollectionEntry = {
        collectionArray: [collectionId],
      };
      window.localStorage.setItem(breakingNewsLSLookup, JSON.stringify(initialCollectionEntry));
    } else {
      const { collectionArray } = dismissedCollectionStorage || {};
      const additionalCollectionEntry = {
        collectionArray: [collectionId, ...collectionArray],
      };
      window.localStorage.setItem(breakingNewsLSLookup, JSON.stringify(additionalCollectionEntry));
    }
  };

  const hideBar = () => {
    setVisibility(false);
    saveCollection();
  };
  const isCollectionDismissed = dismissedCollectionStorage?.collectionArray.some(id => id === collectionId);
  const isBannerNotDismissed = isVisible && !isCollectionDismissed && typeof window !== 'undefined';

  if (story) {
    const headline = get(story, 'headlines.basic', '');
    const url = get(story, 'canonical_url', '');
    return (
      <div className={`c-breakingNews ${isBannerNotDismissed ? 'is-visible' : ''}`}>
        <a href={url} className="breakingURL">
          <div className="c-breakingNews-heading b-flexCenter">
            <span>Breaking</span>
            <span>News</span>
          </div>
          <div className="c-breakingNews-title">{headline}</div>
        </a>
        <span className="c-breakingNews-hide" onClick={hideBar} />
      </div>
    );
  }
  return null;
};

export default BreakingNewsStory;
