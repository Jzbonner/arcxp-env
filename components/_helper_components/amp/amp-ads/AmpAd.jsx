import React from 'react';
import PropTypes from 'prop-types';
import getProperties from 'fusion:properties';
import { ENVIRONMENT } from 'fusion:environment';
import buildJsonObject from './_helper_functions/buildJsonObject';

export const AmpAd = ({
  adSlot = '', uuid = '', topics = [], width = '', height = '', taxonomy,
}) => {
  const { path = '/' } = taxonomy || {};
  const { dfp_id: dfpid } = getProperties();
  const currentEnv = ENVIRONMENT || 'unknown';
  const jsonObject = buildJsonObject(adSlot, uuid, topics);
  const dataSlot = `${dfpid}/${currentEnv.toLowerCase().indexOf('prod') === -1 ? 'TEST_' : ''}atlanta_np/ajc_web_default${path}`;

  if (!dfpid) return null;

  return (
    <div className={`ampAd ${adSlot} b-margin-bottom-d40-m20`}>
      <amp-ad
        width={width}
        height={height}
        layout="responsive"
        type="doubleclick"
        data-loading-strategy ="1.25"
        data-slot={dataSlot}
        json={jsonObject}
      >
      </amp-ad>
    </div>
  );
};

AmpAd.propTypes = {
  adSlot: PropTypes.string,
  uuid: PropTypes.string,
  topics: PropTypes.array,
  width: PropTypes.string,
  height: PropTypes.string,
  taxonomy: PropTypes.object,
};

export default AmpAd;
