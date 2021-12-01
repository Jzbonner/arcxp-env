import React from 'react';
import PropTypes from 'prop-types';

function createNativoKeys(tags, uuid) {
  let values = [];
  tags.forEach(tag => values.push(tag.trim().split(' ').join('-')));
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
  </>
);

NativoScripts.propTypes = {
  tags: PropTypes.array,
  uuid: PropTypes.string,
  layout: PropTypes.string,
  currentSite: PropTypes.string,
};
export default NativoScripts;
