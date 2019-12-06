/*  /components/features/article/headline/default.jsx  */

import React from 'react';
import { useAppContext } from 'fusion:context';
import './style.scss';

const Headline = () => {
  const appContext = useAppContext();
  const { globalContent } = appContext;
  // console.log('test',globalContent);

  return (
    <div className="article-headline text-align">
      <div className="article-headline-body">
        <h3>{globalContent.headlines.basic}</h3>
      </div>
    </div>
  );
};

export default Headline;
