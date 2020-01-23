import React from 'react';
import PropTypes from 'prop-types';
import { taboolaModuleScript } from '../../../src/js/taboola/taboolaScripts';
import '../../../src/styles/base/_utility.scss';

const TaboolaFeed = ({ type }) => (
    <>
      <div id='taboola-ajc-custom-feed'></div>
      <script type='text/javascript' dangerouslySetInnerHTML={{
        __html: taboolaModuleScript(type),
      }}></script>
    </>
);


TaboolaFeed.propTypes = {
  type: PropTypes.string,
};

export default TaboolaFeed;
