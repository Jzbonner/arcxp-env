/*  /components/features/article/subheadline/default.jsx */

import React from 'react';
import PropTypes from 'prop-types';
import './style.scss';

const SubHeadline = ({ subheadlines }) => {
  const { basic } = subheadlines || {};
  if (!basic) return null;

  return (
    <div className="b-flexRow b-flexCenter b-margin-bottom-d15-m10">
      <div className="subheadline-content">
        <span>{basic}</span>
      </div>
    </div>
  );
};

SubHeadline.propTypes = {
  subheadlines: PropTypes.object,
};

export default SubHeadline;
