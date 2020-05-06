import React from 'react';
import PropTypes from 'prop-types';
import getProperties from 'fusion:properties';
import { ENVIRONMENT } from 'fusion:environment';
import buildJsonObject from './_helper_functions/buildJsonObject';

export const AmpAd = ({
  adSlot = '', uuid = '', width = '', height = '', taxonomy, multiSize, multiSizeValidation,
}) => {
  const { dfp_id: dfpid, adsPath } = getProperties();
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
  const dataSlot = `${dfpid}/${currentEnv.toLowerCase().indexOf('prod') === -1 ? 'TEST_' : ''}${adsPath}${path}`;

  return (
    <amp-ad
      width={width}
      height={height}
      layout="fixed"
      type="doubleclick"
      data-loading-strategy ="1.25"
      data-slot={dataSlot}
      json={jsonObject}
      class="ampAd"
      data-multi-size={multiSize}
      data-multi-size-validation={multiSizeValidation}
    >
    </amp-ad>
  );
};

AmpAd.propTypes = {
  adSlot: PropTypes.string,
  uuid: PropTypes.string,
  width: PropTypes.string,
  height: PropTypes.string,
  taxonomy: PropTypes.object,
  multiSize: PropTypes.string,
  multiSizeValidation: PropTypes.string,
};

export default AmpAd;
