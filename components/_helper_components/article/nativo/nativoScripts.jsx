import React from 'react';
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

const NativoScripts = ({ tags, uuid }) => (
  <>
    <script
      type="text/javascript"
      dangerouslySetInnerHTML={{
        __html: `window.ntvConfig = window.ntvConfig || {}; window.ntvConfig.keyValues = ${createNativoKeys(tags, uuid)};`,
      }}
    ></script>
    <script
      type="text/javascript"
      dangerouslySetInnerHTML={{
        __html: "let _prx = window._prx || []; _prx.push(['cfg.SetNoAutoStart']);",
      }}
    ></script>
    <script type="text/javascript" src="//s.ntv.io/serve/load.js" async></script>
  </>
);

NativoScripts.propTypes = {
  tags: PropTypes.array,
  uuid: PropTypes.string,
};

export default NativoScripts;
