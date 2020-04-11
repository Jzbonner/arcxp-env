import React, { useState } from 'react';
import getProperties from 'fusion:properties';
import { useContent } from 'fusion:content';
import './default.scss';

const BreakingNews = () => {
  const { breakingNewsID, breakingLiveVideoID } = getProperties();
  const [isVisible, setVisibility] = useState(true);

  const breakingNewsData = useContent({
    source: 'collections-api',
    query: { id: `${breakingNewsID}` },
  });

  const hideBar = () => {
    setVisibility(false);
  };

  const breakingNewsItem = breakingNewsData && breakingNewsData.content_elements[0] ? breakingNewsData.content_elements : false;
  let breakingHeadline;
  let breakingURL;
  let mainTitle;

  if (breakingNewsItem) {
    breakingHeadline = breakingNewsData && breakingNewsItem[0] ? breakingNewsItem[0].headlines.basic : '';
    breakingURL = breakingNewsItem && breakingNewsItem[0] ? breakingNewsItem[0].canonical_url : '';
    mainTitle = 'Breaking News';
  } else {
    const liveVideoData = useContent({
      source: 'collections-api',
      query: { id: `${breakingLiveVideoID}` },
    });
    const liveVideoItem = liveVideoData && liveVideoData.content_elements[0] ? liveVideoData.content_elements : [];
    breakingHeadline = liveVideoData && liveVideoItem[0] ? liveVideoItem[0].headlines.basic : '';
    breakingURL = liveVideoItem && liveVideoItem[0] ? liveVideoItem[0].canonical_url : '';
    mainTitle = 'Live Video';
  }

  if (breakingHeadline) {
    return (
      <div className={`c-breakingNews ${!isVisible ? 'is-hidden' : ''}`}>
        <a href={breakingURL} className="breakingURL"></a>
        <span className="c-breakingNews-hide" onClick={hideBar}></span>
        <h2 className="c-breakingNews-heading">{mainTitle}</h2>
        <h2 className="c-breakingNews-content">{breakingHeadline}</h2>
      </div>
    );
  }
  return null;
};

export default BreakingNews;
