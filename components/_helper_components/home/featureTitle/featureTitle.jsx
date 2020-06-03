import React from 'react';
import PropTypes from 'prop-types';

const FeatureTitle = ({ title, moreURL }) => {
  if (title) {
    return (
      <div className="b-sectionTitle">
        {moreURL ? (
          <a href={moreURL} className="b-titleURL">
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
