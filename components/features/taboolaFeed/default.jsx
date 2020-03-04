import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { taboolaModuleScript } from '../../../src/js/taboola/taboolaScripts';
import '../../../src/styles/base/_utility.scss';

const TaboolaFeed = ({ type }) => {
  useEffect(() => {
    const taboolaScript = document.createElement('script');
    taboolaScript.innerHTML = taboolaModuleScript(type);
    taboolaScript.async = true;
    document.body.appendChild(taboolaScript);
  }, []);

  return <div id='taboola-ajc-custom-feed' className='b-clear-both'></div>;
};

TaboolaFeed.propTypes = {
  type: PropTypes.string,
};

export default TaboolaFeed;
