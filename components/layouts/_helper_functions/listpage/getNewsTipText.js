import React from 'react';

const getNewsTipText = (textBox = '', placement = '') => {
  if (!placement || !textBox) return null;

  return <div className={`c-news-tip-text ${placement}`}>{textBox}</div>;
};

export default getNewsTipText;
