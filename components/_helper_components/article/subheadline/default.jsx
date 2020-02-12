/*  /components/features/article/subheadline/default.jsx */

import React from 'react';
import PropTypes from 'prop-types';
import './style.scss';

const SubHeadline = ({ subheadlines }) => {
  const { basic } = subheadlines || {};
  if (!basic) return null;

  return (
    <div className="subheadline-content">
      <span>{basic}</span>
    </div>
  );
};

SubHeadline.propTypes = {
  subheadlines: PropTypes.object,
};

export default SubHeadline;
