import React from 'react';
import '../../../src/styles/base/_utility.scss';

const TaboolaFeed = () => (
    <>
      <div id='taboola-ajc-custom-feed'></div>
      <script type='text/javascript' dangerouslySetInnerHTML={{
        __html: `window._taboola = window._taboola || []; _taboola.push(
          { mode: 'thumbnails-feed-4x1', container: 'taboola-ajc-custom-feed',placement: 'AJC Custom Feed',target_type: 'mix'});`,
      }}></script>
    </>
);

export default TaboolaFeed;
