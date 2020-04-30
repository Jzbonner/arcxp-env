/* eslint-disable no-console */
import React, { useState } from 'react';
import { useContent } from 'fusion:content';
import getProperties from 'fusion:properties';
import { useFusionContext } from 'fusion:context';
import './default.scss';

const BreakingNews = () => {
  const [isVisible, setVisibility] = useState(true);
  const hideBar = () => {
    setVisibility(false);
  };
  const {
    breakingNewsID, breakingLiveVideoID,
  } = getProperties();
  const fusionContext = useFusionContext();
  const { arcSite = 'ajc' } = fusionContext;

  const newsData = useContent({
    source: 'breaking-news-video-alert',
    query: {
      breakingNewsID,
      breakingLiveVideoID,
      site: arcSite,
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
