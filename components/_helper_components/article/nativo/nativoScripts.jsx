import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

function createNativoKeys(tags, uuid) {
  let values = [];
  tags.forEach(tag => values.push(tag.text.split(' ').join('-')));
  values = values.toString();

  const kvpMap = {};
  kvpMap.topics = values;
  kvpMap.uuid = uuid;

  return JSON.stringify(kvpMap);
}

const onloadCallback = (layout, currentSite) => {
  if (layout !== 'article-basic' || currentSite === 'dayton') {
    return useEffect(() => {
      if (typeof window.PostRelease !== 'undefined') {
        window.PostRelease.Start();
      } else {
        /* eslint-disable-next-line no-console */
        console.error('PostRelease does not exist:', typeof PostRelease);
      }
    }, []);
  }
  return null;
};

const NativoScripts = ({
  tags,
  uuid,
  layout,
  currentSite,
}) => (
  <>
    <script
      type="text/javascript"
      dangerouslySetInnerHTML={{
        __html: `window.ntvConfig = window.ntvConfig || {}; window.ntvConfig.keyValues = ${createNativoKeys(tags, uuid)};`,
      }}
    ></script>
    <script
      src="//s.ntv.io/serve/load.js"
      data-ntv-set-no-auto-start
      async
      onLoad={onloadCallback(layout, currentSite)}
    ></script>
  </>
);

NativoScripts.propTypes = {
  tags: PropTypes.array,
  uuid: PropTypes.string,
  layout: PropTypes.string,
  currentSite: PropTypes.string,
};

export default NativoScripts;
