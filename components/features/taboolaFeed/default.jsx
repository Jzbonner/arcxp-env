import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import getProperties from 'fusion:properties';
import { useAppContext } from 'fusion:context';
import { taboolaModuleScript } from '../../../src/js/taboola/taboolaScripts';
import '../../../src/styles/base/_utility.scss';

const TaboolaFeed = ({ ampPage }) => {
  const appContext = useAppContext();
  const { layout } = appContext;
  const { taboola, siteName } = getProperties();
  const {
    dataPublisher,
    taboolaStoryID,
    taboolaSectionID,
    containerName,
    placementName,
  } = taboola;
  if (ampPage) {
    return (
      <div className="c-section b-margin-bottom-d40-m20">
        <amp-embed width='100' height='100'
          type='taboola'
          layout='responsive'
          data-publisher={dataPublisher}
          data-mode='thumbnails-f-amp'
          data-placement='Below Article Thumbnails AMP - Redesign'
          data-target_type='mix'
          data-article='auto'
          data-url=''/>
      </div>
    );
  }

  if (siteName === 'dayton') return null;

  useEffect(() => {
    const taboolaScript = document.createElement('script');
    taboolaScript.innerHTML = taboolaModuleScript(layout, containerName, placementName);
    taboolaScript.async = true;
    document.body.appendChild(taboolaScript);
  }, []);

  return (
      <div className={layout === 'article-basic' ? 'c-section' : ''}>
        <div id={ layout === 'article-basic' ? taboolaStoryID : taboolaSectionID } className='b-clear-both'></div>
      </div>);
};

TaboolaFeed.propTypes = {
  ampPage: PropTypes.bool,
};

export default TaboolaFeed;
