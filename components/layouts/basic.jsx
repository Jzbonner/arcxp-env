/*  /components/layouts/basic.jsx  */

import React from 'react';
import PropTypes from 'prop-types';

const StoryPageLayout = (props) => {
  const [heading, leadImage, byline, content] = props.children;

  return <>
    <header>
      <h1>
        hello lisa
        { heading }
      </h1>
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

StoryPageLayout.sections = [
  'heading',
  'leadImage',
  'byline',
  'content',
];

StoryPageLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default StoryPageLayout;
