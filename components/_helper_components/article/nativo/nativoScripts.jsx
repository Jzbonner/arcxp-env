import React from 'react';
import PropTypes from 'prop-types';
import getProperties from 'fusion:properties';
import fetchEnv from '../../global/utils/environment';

function createNativoKeys(tags, uuid) {
  let values = [];
  tags.forEach(tag => values.push(tag.text.split(' ').join('-')));
  values = values.toString();

  const kvpMap = {};
  kvpMap.topics = values;
  kvpMap.uuid = uuid;

  return JSON.stringify(kvpMap);
}

const NativoScripts = ({
  tags,
  uuid,
  layout,
  currentSite,
}) => {
  const { nativo } = getProperties(currentSite) || {};
  const currentEnv = fetchEnv();
  const { lazyLoad } = nativo[currentEnv] || false;
  return <>
    <script
      type="text/javascript"
      dangerouslySetInnerHTML={{
        __html: `window.ntvConfig = window.ntvConfig || {}; window.ntvConfig.keyValues = ${createNativoKeys(tags, uuid)};`,
      }}
    ></script>
    {!lazyLoad && <>
      <script type="text/javascript" dangerouslySetInnerHTML={{
        __html: "let _prx = window._prx || []; _prx.push(['cfg.SetNoAutoStart']);",
      }}></script>
      <script src="//s.ntv.io/serve/load.js"></script>
    </>}

    {/* only render the following script if it's _not_ an article page, or it's Dayton.com */}
    {lazyLoad && <script src="//s.ntv.io/serve/load.js" data-ntv-set-no-auto-start async></script>}
    {lazyLoad && (layout !== 'article-basic' || currentSite === 'dayton') && <script
      type='text/javascript'
      dangerouslySetInnerHTML={{
        __html: `
        const totalAttempts = 3;
        let attemptInterval = 500;
        let thisAttempt = 0;
        if (window.PostRelease) {
          window.PostRelease.Start();
        } else if (thisAttempt < totalAttempts) {
          // calls nativo script at doubling intervals (starting at 1/2s) until it's available or we run out of attempts
          setTimeout(() => {
            if (window.PostRelease) {
              window.PostRelease.Start();
              thisAttempt = totalAttempts;
            }
            attemptInterval = attemptInterval * 2;
            thisAttempt++;
          }, attemptInterval);
        }`,
      }}></script>
    }
  </>;
};

NativoScripts.propTypes = {
  tags: PropTypes.array,
  uuid: PropTypes.string,
  layout: PropTypes.string,
  currentSite: PropTypes.string,
};

export default NativoScripts;
