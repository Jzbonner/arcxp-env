/*  /components/features/article/subheadline/default.jsx  */

import React from 'react';
import PropTypes from 'prop-types';
import './style.scss';

const SubHeadline = ({ subheadlines }) => {
  const { basic } = subheadlines || {};
  if (!basic) return null;

  return (
    <div className="article-subheadline text-align">
      <span>{basic}</span>
    </div>
  );
};

SubHeadline.propTypes = {
  subheadlines: PropTypes.object,
};

export default SubHeadline;
