import React, { useState } from 'react';
import PropTypes from 'prop-types';
import '../default.scss';

const RenderBreakingNews = ({ breakingURL, mainTitle, breakingHeadline }) => {
  const [isVisible, setVisibility] = useState(true);
  const hideBar = () => {
    setVisibility(false);
  };

  return (
    <div className={`c-breakingNews ${!isVisible ? 'is-hidden' : ''}`}>
      <a href={breakingURL} className="breakingURL" />
      <span className="c-breakingNews-hide" onClick={hideBar} />
      <h2 className="c-breakingNews-heading">{mainTitle}</h2>
      <h2 className="c-breakingNews-content">{breakingHeadline}</h2>
    </div>
  );
};

RenderBreakingNews.propTypes = {
  breakingURL: PropTypes.string,
  mainTitle: PropTypes.string,
  breakingHeadline: PropTypes.string,
};

export default RenderBreakingNews;
