import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { taboolaModuleScript } from '../../../src/js/taboola/taboolaScripts';
import '../../../src/styles/base/_utility.scss';

const TaboolaFeed = ({ type, ampPage }) => {
  if (ampPage) {
    return (
      <div className="c-section">
        <amp-embed width='100' height='100'
          type='taboola'
          layout='responsive'
          data-publisher='cox-atlantajournal-constitution'
          data-mode='thumbnails-f-amp'
          data-placement='Below Article Thumbnails AMP - Redesign'
          data-target_type='mix'
          data-article='auto'
          data-url=''/>
      </div>
    );
  }

  useEffect(() => {
    const taboolaScript = document.createElement('script');
    taboolaScript.innerHTML = taboolaModuleScript(type);
    taboolaScript.async = true;
    document.body.appendChild(taboolaScript);
  }, []);

  return <div className="c-section"><div id='taboola-ajc-custom-feed' className='b-clear-both'></div></div>;
};

TaboolaFeed.propTypes = {
  type: PropTypes.string,
  ampPage: PropTypes.bool,
};

export default TaboolaFeed;
