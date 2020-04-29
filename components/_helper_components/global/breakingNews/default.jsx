/* eslint-disable no-console */
import React, { useState } from 'react';
// import { useContent } from 'fusion:content';
import './default.scss';

const BreakingNews = () => {
  const [isVisible, setVisibility] = useState(true);
  const hideBar = () => {
    setVisibility(false);
  };

  // const newsData = useContent({
  //   source: 'breaking-news-video-alert',
  // });

  const newsData = [];

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
