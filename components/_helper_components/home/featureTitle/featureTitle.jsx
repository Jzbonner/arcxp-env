import React from 'react';
import PropTypes from 'prop-types';
import './default.scss';

const FeatureTitle = ({ title, moreURL }) => {
  const getLink = () => {
    if (moreURL.indexOf('http') === 0 || moreURL.indexOf('/') === 0) {
      // it's a properly-qualified absolute or relative url
      return moreURL;
    }
    // it's likely supposed to be an absolute url so let's make it so
    return `//${moreURL}`;
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
