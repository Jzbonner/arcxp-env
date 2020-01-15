import React from 'react';
import '../../../src/styles/base/_utility.scss';
import { taboolaModuleScript } from '../../../src/js/taboola/taboolaScripts';

const TaboolaFeed = () => (
    <>
      <div id='taboola-ajc-custom-feed'></div>
      <script type='text/javascript' dangerouslySetInnerHTML={{
        __html: taboolaModuleScript,
      }}></script>
    </>
);

export default TaboolaFeed;
