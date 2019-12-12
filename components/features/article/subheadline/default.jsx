/*  /components/features/article/headline/default.jsx  */

import React from 'react';
import { useAppContext } from 'fusion:context';
import './style.scss';

const SubHeadline = () => {
  const appContext = useAppContext();
  const { globalContent } = appContext;
  // console.log(globalContent.subheadlines);

  return (
    <div className="article-subheadline">
      <div className="article-subheadline-body text-align">
        {/* <span>This is a subheadline. This will appear below the headline.</span> */}
        {/* <span>Colin Kaepernick once led the San Francisco 49ers to back-to-back playoff appearances, including a Super Bowl</span> */}
        <span>{globalContent.subheadlines.basic}</span>
      </div>
    </div>
  );
};

export default SubHeadline;
