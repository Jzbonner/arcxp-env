import React from 'react';
import PropTypes from 'prop-types';
import getProperties from 'fusion:properties';
import { ENVIRONMENT } from 'fusion:environment';
import buildJsonObject from './_helper_functions/buildJsonObject';

export const AmpAd = ({
  adSlot = '', uuid = '', width = '', height = '', taxonomy,
}) => {
  const { dfp_id: dfpid } = getProperties();
  if (!dfpid) return null;

  const { primary_section: primarySection, tags = [] } = taxonomy || {};
  const { path = '/' } = primarySection || {};
  const topics = [];
  tags.forEach((tag) => {
    if (tag && tag.text) {
      topics.push(tag.text);
    }
  });

  const currentEnv = ENVIRONMENT || 'unknown';
  const jsonObject = buildJsonObject(adSlot, uuid, topics);
  const dataSlot = `${dfpid}/${currentEnv.toLowerCase().indexOf('prod') === -1 ? 'TEST_' : ''}atlanta_np/ajc_web_default${path}`;

  return (
    <div className={`ampAd ${adSlot} b-margin-bottom-d40-m20`}>
      <amp-ad
        width={width}
        height={height}
        layout="responsive"
        type="doubleclick"
        data-loading-strategy ="1.25"
        data-slot={dataSlot}
        json={JSON.stringify(jsonObject)}
      >
      </amp-ad>
    </div>
  );
};

AmpAd.propTypes = {
  adSlot: PropTypes.string,
  uuid: PropTypes.string,
  width: PropTypes.string,
  height: PropTypes.string,
  taxonomy: PropTypes.object,
};

export default AmpAd;
