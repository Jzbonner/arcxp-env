import React from 'react';
import PropTypes from 'prop-types';
import getProperties from 'fusion:properties';
import AdSetup from './src/index';
import fetchEnv from '../../_helper_components/global/utils/environment.js';
import { adSlots, defaultAdSlot } from './children/adtypes';
import getAdTargeting from './_helper_functions/getAdTargeting';

const ArcAd = ({ customFields, staticSlot }) => {
  const { slot: customFieldsSlot } = customFields || {};
  const { dfp_id: dfpid, siteName } = getProperties();
  const slot = customFieldsSlot || staticSlot;
  let randomIdMPG01 = '';
  const currentEnv = fetchEnv();

  // If there is no DFP ID and we are in the Admin,
  if (!dfpid) return null;

  // what to display if there is no ad
  const fallbackAd = null;

  const adConfig = adSlots[slot] || null;

  // if there is no adConfig for the requested ad, abort
  if (!adConfig) {
    return null;
  }

  // use their slotname if given, otherwise default to the slot for this ad type
  const slotName = adConfig.slotName || slot;

  if (staticSlot && staticSlot.includes('MPG01')) randomIdMPG01 = Math.floor(Math.random() * 999999);

  const targeting = adConfig.targeting || defaultAdSlot.targeting || {};
  // get global targeting values
  const globalTargeting = getAdTargeting(slotName, siteName, currentEnv);

  const arcad = (
    <AdSetup
      refresh={true}
      breakpoints={adConfig.breakpoints || defaultAdSlot.breakpoints}
      className={`arc_ad | ${slotName} ${adConfig.isRightRailAd ? 'c-rightRail' : ''} ${adConfig.isSticky ? 'is-sticky' : ''}`}
      dimensions={ adConfig.dimensions || defaultAdSlot.dimensions }
      dfpId={`${dfpid}/${currentEnv !== 'prod' ? 'TEST_' : ''}atlanta_np/ajc_web_default`}
      display={adConfig.display || defaultAdSlot.display}
      id={`${defaultAdSlot.name}${staticSlot || slot}${randomIdMPG01 !== '' ? `-${randomIdMPG01}` : ''}`}
      slotName={slotName}
      targeting={{ ...globalTargeting, ...targeting }}
    />
  );

  return slotName ? arcad : fallbackAd;
};

ArcAd.propTypes = {
  customFields: PropTypes.shape({
    slot: PropTypes.oneOf([
      '',
      'HP01',
      'HP02',
      'MP01',
      'MP02',
      'MP03',
      'MP04',
      'MP05',
      'RP01',
      'RP01 sticky',
      'RP02',
      'RP03 sticky',
      'RP09 sticky',
    ]).tag({
      label: 'Slot ID',
      description: 'Select the ad slot to be inserted',
    }),
  }),
  staticSlot: PropTypes.string,
};

ArcAd.defaultProps = {
  componentName: 'ArcAd',
};

export default ArcAd;
