/*  /components/layouts/article-basic.jsx  */

import React from 'react';
import PropTypes from 'prop-types';
import { useAppContext } from 'fusion:context';
import TimeStamp from '../_helper_components/article/timestamp/default';

const HomePageLayout = (props) => {
  const [heading, leadImage, byline, content] = props.children;

  const appContext = useAppContext();
  const { globalContent } = appContext;

  if (!globalContent) return null;

  const {
    first_publish_date: firstPublishDate,
    display_date: displayDate,
  } = globalContent;

  return <>
    <header>
      <h1>
        { heading }
      </h1>
      <TimeStamp
        firstPublishDate={firstPublishDate}
        displayDate={displayDate}
      />
      <div>
        { leadImage }
      </div>
      <div>
        { byline }
      </div>
    </header>
    <article>
      { content }
    </article>
  </>;
};

HomePageLayout.sections = [
  'heading',
  'leadImage',
  'byline',
  'content',
];

HomePageLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default HomePageLayout;
