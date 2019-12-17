import React from 'react';
import { useAppContext } from 'fusion:context';
import HeadlineImage from './headlineImage/default';
import './style.scss';

const Headline = () => {
  const appContext = useAppContext();
  const { globalContent } = appContext;
  return (
    <div className="article-headline text-align">
      <div className="article-headline-body">
        <h3>{globalContent.headlines.basic}</h3>
      </div>
      <HeadlineImage global={globalContent} />
    </div>
  );
};

export default Headline;
