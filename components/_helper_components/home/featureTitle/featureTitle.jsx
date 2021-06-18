import React from 'react';
import PropTypes from 'prop-types';
import './default.scss';

const FeatureTitle = ({ title, moreURL }) => {
  const getLink = () => {
    if (moreURL.includes('https://www')) {
      return moreURL;
    }
    return moreURL;
  };

  const buildTitle = () => {
    if (moreURL) {
      return <a href={getLink()} className="titleURL">{title}</a>;
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
