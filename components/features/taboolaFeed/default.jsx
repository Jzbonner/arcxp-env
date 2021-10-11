import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import getProperties from 'fusion:properties';
import { useAppContext, useFusionContext } from 'fusion:context';
import { taboolaFooterScript, taboolaHeaderScript, taboolaModuleScript } from '../../../src/js/taboola/taboolaScripts';
import fetchEnv from '../../_helper_components/global/utils/environment';
import deferThis from '../../_helper_components/global/utils/deferLoading';
import '../../../src/styles/base/_utility.scss';
import './default.scss';

const TaboolaFeed = ({ ampPage, lazyLoad = false, treatAsArticle = false }) => {
  const fusionContext = useFusionContext();
  const { arcSite } = fusionContext;
  const appContext = useAppContext();
  const { layout: pageLayout } = appContext;
  const currentEnv = fetchEnv();
  const { taboola, siteName } = getProperties(arcSite);
  const { moapPTD, boapPTD } = taboola[currentEnv] || {};
  const {
    cdnLink,
    dataPublisher,
    taboolaStoryID,
    taboolaSectionID,
    containerName,
    placementName,
  } = taboola || {};
  // workaround to treat non-article pages (i.e. Live Updates) as articles
  const layout = treatAsArticle ? 'article-basic' : pageLayout;

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
    const taboolaHeadScript = document.createElement('script');
    taboolaHeadScript.innerHTML = taboolaHeaderScript(layout, cdnLink);
    if (lazyLoad) {
      deferThis({ script: taboolaHeadScript });
    } else {
      document.head.appendChild(taboolaHeadScript);
    }

    const taboolaFootScript = document.createElement('script');
    taboolaFootScript.innerHTML = taboolaFooterScript(layout);
    if (lazyLoad) {
      deferThis({ script: taboolaFootScript });
    } else {
      document.body.appendChild(taboolaFootScript);
    }

    const taboolaScript = document.createElement('script');
    taboolaScript.innerHTML = taboolaModuleScript(layout, containerName, placementName, moapPTD, boapPTD);
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
  treatAsArticle: PropTypes.bool, // flag for treating pb pages as articles
};

export default TaboolaFeed;
