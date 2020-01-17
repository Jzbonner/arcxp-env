import React from 'react';
import PropTypes from 'prop-types';
import '../../../src/styles/base/_utility.scss';

const TaboolaFeed = ({ type }) => {
  let containerName;
  let placementName;
  if (type === 'story' || type === 'blog') {
    containerName = 'taboola-ajc-custom-feed';
    placementName = 'AJC Custom Feed';
    // next two cases are a work in progress will be dependent on architecture
  } else if (type === 'section') {
    containerName = 'taboola-ajc-custom-feed--sction-fronts';
    placementName = 'AJC Custom Feed - Section Fronts';
  } else if (type === 'homepage') {
    containerName = 'taboola-ajc-custom-feed--home-page';
    placementName = 'AJC Custom Feed - Home Page';
  }


  return (
    <>
      <div id='taboola-ajc-custom-feed'></div>
      <script type='text/javascript' dangerouslySetInnerHTML={{
        __html: `window._taboola = window._taboola || []; _taboola.push(
          { mode: 'thumbnails-feed-4x1', container: '${containerName}',placement: '${placementName}',target_type: 'mix'});`,
      }}></script>
    </>
  );
};

TaboolaFeed.propTypes = {
  type: PropTypes.string,
};

export default TaboolaFeed;
