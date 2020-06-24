import React from 'react';
import PropTypes from 'prop-types';
import { useAppContext } from 'fusion:context';
import './default.scss';

const FeatureTitle = ({ title, moreURL }) => {
  const appContext = useAppContext();
  const { contextPath } = appContext;

  const getLink = () => {
    if (!moreURL.includes('https://www')) {
      if (window.location.hostname !== 'ajc.com') {
        return `${contextPath}${moreURL}/?_website=ajc`;
      }
      return `${contextPath}${moreURL}`;
    }
    return moreURL;
  };

  if (title) {
    return (
      <div className="c-sectionTitle">
        {moreURL ? (
          <a href={getLink()} className="titleURL">
            {title}
            <span className="btn-arrow-right btn-readmore"></span>
          </a>
        ) : (
          title
        )}
      </div>
    );
  }
  return null;
};

FeatureTitle.propTypes = {
  title: PropTypes.string,
  moreURL: PropTypes.string,
};

export default FeatureTitle;
