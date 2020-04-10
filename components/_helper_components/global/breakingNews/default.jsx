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

  const liveVideoData = useContent({
    source: 'collections-api',
    query: { id: `${breakingLiveVideoID}` },
  });

  const hideBar = () => {
    setVisibility(false);
  };

  const { content_elements: breakingNewsItem } = breakingNewsData && breakingNewsData.content_elements[0] ? breakingNewsData : [];
  const { content_elements: liveVideoItem } = liveVideoData && liveVideoData.content_elements[0] ? liveVideoData : [];

  if (breakingNewsItem) {
    const { basic: breakingHeadline } = breakingNewsData && breakingNewsItem[0] ? breakingNewsItem[0].headlines : {};
    const { canonical_url: breakingURL } = breakingNewsItem[0] || {};
    return (
      <div className={`c-breakingNews ${!isVisible ? 'is-hidden' : ''}`}>
        <a href={breakingURL} className="breakingURL"></a>
        <span className="c-breakingNews-hide" onClick={hideBar}></span>
        <h2 className="c-breakingNews-heading">Breaking News</h2>
        <h2 className="c-breakingNews-content">{breakingHeadline}</h2>
      </div>
    );
  }
  if (!breakingNewsItem && liveVideoItem) {
    const { basic: liveVideoHeadline } = liveVideoData && liveVideoItem[0] ? liveVideoItem[0].headlines : {};
    const { canonical_url: liveVideoURL } = liveVideoItem && liveVideoItem[0] ? liveVideoItem[0] : {};
    return (
      <div className={`c-breakingNews ${!isVisible ? 'is-hidden' : ''}`}>
        <a href={liveVideoURL} className="breakingURL"></a>
        <span className="c-breakingNews-hide" onClick={hideBar}></span>
        <h2 className="c-breakingNews-heading">Live Video</h2>
        <h2 className="c-breakingNews-content">{liveVideoHeadline}</h2>
      </div>
    );
  }
  return null;
};

export default BreakingNews;
