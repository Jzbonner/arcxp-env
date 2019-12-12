/*  /components/features/article/headline/default.jsx  */

import React from 'react';
import { useAppContext } from 'fusion:context';
import './style.scss';

const SubHeadline = () => {
  const appContext = useAppContext();
  const { globalContent } = appContext;

  return (
    <div className="article-subheadline">
      <div className="article-subheadline-body text-align">
        <span>{globalContent.subheadlines.basic}</span>
      </div>
    </div>
  );
};

export default SubHeadline;
