import React from 'react';
import PropTypes from 'prop-types';
import './default.scss';

const FeatureTitle = ({ title, moreURL }) => {
  if (title) {
    return (
      <div className="c-sectionTitle">
        {moreURL ? (
          <a href={moreURL} className="titleURL">
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
