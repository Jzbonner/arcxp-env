/*  /components/features/article/subheadline/default.jsx  */

import React from 'react';
import { useAppContext } from 'fusion:context';
import './style.scss';

const SubHeadline = () => {
  const appContext = useAppContext();
  const { globalContent } = appContext;
  const subheadline = globalContent.subheadlines.basic;

  return (
    <div className="article-subheadline">
      <div className="article-subheadline-body text-align">
        {subheadline && (
          <span>{subheadline}</span>
        )}
      </div>
    </div>
  );
};

export default SubHeadline;
