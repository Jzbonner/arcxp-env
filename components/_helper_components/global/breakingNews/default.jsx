import React, { memo } from 'react';
import BreakingNewsStory from './breaking-news-story';
import BreakingNewsVideo from './breaking-news-video';

const BreakingNews = () => (
  <>
    <BreakingNewsStory />
    {!BreakingNewsStory() && <BreakingNewsVideo />}
  </>
);

export default memo(BreakingNews);
