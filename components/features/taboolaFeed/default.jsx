import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import getProperties from 'fusion:properties';
import { useAppContext, useFusionContext } from 'fusion:context';
import { taboolaModuleScript } from '../../../src/js/taboola/taboolaScripts';
import fetchEnv from '../../_helper_components/global/utils/environment';
import deferThis from '../../_helper_components/global/utils/deferLoading';
import '../../../src/styles/base/_utility.scss';

const TaboolaFeed = ({ ampPage, lazyLoad = false }) => {
  const fusionContext = useFusionContext();
  const { arcSite } = fusionContext;
  const appContext = useAppContext();
  const { layout } = appContext;
  const currentEnv = fetchEnv();
  const { taboola, siteName, nativo } = getProperties(arcSite);
  const {
    dataPublisher,
    taboolaStoryID,
    taboolaSectionID,
    containerName,
    placementName,
  } = taboola || {};
  const { moapPTD, boapPTD } = taboola[currentEnv] || {};
  const { lazyLoad: lazyLoadNativo = false } = nativo[currentEnv];
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
    taboolaScript.innerHTML = taboolaModuleScript(layout, containerName, placementName, moapPTD, boapPTD, siteName, lazyLoadNativo);
    taboolaScript.async = true;
    if (lazyLoad) {
      deferThis({ script: taboolaScript });
    } else {
      document.body.appendChild(taboolaScript);
    }
  }, []);

  return (
      <div className={layout === 'article-basic' ? 'c-section' : ''}>
        <div id={ layout === 'article-basic' ? taboolaStoryID : taboolaSectionID } className='b-clear-both'></div>
      </div>);
};

TaboolaFeed.propTypes = {
  ampPage: PropTypes.bool,
  lazyLoad: PropTypes.bool, // flag for lazyloading (e.g. connext/paywall)
};

export default TaboolaFeed;
