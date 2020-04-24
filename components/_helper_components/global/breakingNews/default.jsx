/* eslint-disable no-console */
import React, { useState } from 'react';

import { useContent } from 'fusion:content';
import './default.scss';

const BreakingNews = () => {
  const [isVisible, setVisibility] = useState(true);
  const hideBar = () => {
    setVisibility(false);
  };

  const newsData = useContent({
    source: 'breaking-news-video-alert',
  });

  console.log('[Breaking News]:', newsData);

  if (newsData) {
    // const { name } = newsData;
    return (
      <div className={`c-breakingNews ${!isVisible ? 'is-hidden' : ''}`}>
        <a href="" className="breakingURL" />
        <span className="c-breakingNews-hide" onClick={hideBar} />
        {/* <h2 className="c-breakingNews-heading">{name}</h2> */}
        <h2 className="c-breakingNews-content">Headline</h2>
      </div>
    );
  }
  return null;
};

export default BreakingNews;
