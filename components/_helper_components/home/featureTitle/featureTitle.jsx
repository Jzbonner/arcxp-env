import React from 'react';
import PropTypes from 'prop-types';
import './default.scss';

const FeatureTitle = ({ title, moreURL, isLeftPhotoNoPhoto }) => {
  const getLink = () => {
    if (moreURL.includes('https://www')) {
      return moreURL;
    }
    return moreURL;
  };

  const buildTitle = () => {
    if (isLeftPhotoNoPhoto) {
      return (
        <>
        <span className="title-text">
        {title}
        </span>
          <i className="title-bar"></i>
        </>
      );
    }

    if (moreURL) {
      return (
        <a href={getLink()} className="titleURL">
          {title}
          <span className="btn-arrow-right btn-readmore"></span>
        </a>
      );
    }

    return title;
  };

  if (title) {
    return (
      <div className="c-sectionTitle">
        {buildTitle()}
      </div>
    );
  }
  return null;
};

FeatureTitle.propTypes = {
  title: PropTypes.string,
  moreURL: PropTypes.string,
  isLeftPhotoNoPhoto: PropTypes.bool,
};

export default FeatureTitle;
