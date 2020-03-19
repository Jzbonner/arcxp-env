import React from 'react';
import PropTypes from 'prop-types';
import { useAppContext } from 'fusion:context';
import getProperties from 'fusion:properties';
import AdSetup from './src/index';
import { adSlots, defaultAdSlot } from './children/adtypes';

const ArcAd = ({ customFields, staticSlot }) => {
  const appContext = useAppContext();
  const { globalContent, requestUri } = appContext;
  const { _id: uuid } = globalContent || {};
  const { slot: customFieldsSlot } = customFields || {};
  const { dfp_id: dfpid } = getProperties();
  const slot = customFieldsSlot || staticSlot;
  let rng = 0;

  console.log('staticSlot', staticSlot);

  // If there is no DFP ID and we are in the Admin,
  if (!dfpid) return null;

  // what to display if there is no ad
  const fallbackAd = null;

  const adConfig = adSlots[slot] || null;

  // if there is no adConfig for the requested ad, abort
  if (!adConfig) {
    return null;
  }

  const targeting = adConfig.targeting || defaultAdSlot.targeting;

  if (uuid) {
    targeting.uuid = uuid;
  }

  if (requestUri && requestUri.indexOf('?') > -1) {
    // there is a query string, let's see if it includes "testads"
    const queryString = requestUri.substring(requestUri.indexOf('?'));
    if (queryString.indexOf('testads') > -1) {
      // "testads" exists, let's (re)set the "environ" value
      targeting.environ = 'debug';
    }
  }

  // use their slotname if given, otherwise default to the slot for this ad type
  const slotName = adConfig.slotName || slot;

  if (staticSlot && staticSlot.includes('MPG01')) rng = Math.floor(Math.random() * 9999999);

  console.log('rng', rng);
  const arcad = (
    <AdSetup
      refresh={true}
      breakpoints={adConfig.breakpoints || defaultAdSlot.breakpoints}
      className={`arc_ad | ${slotName} ${adConfig.isRightRailAd ? 'c-rightRail' : ''} ${adConfig.isSticky ? 'is-sticky' : ''}`}
      dimensions={adConfig.dimensions || defaultAdSlot.dimensions}
      dfpId={`${dfpid}/TEST_atlanta_np/ajc_web_default`}
      display={adConfig.display || defaultAdSlot.display}
      id={`${defaultAdSlot.name}${staticSlot || slot}-${rng !== 0 && rng}`}
      slotName={slotName}
      targeting={targeting}
    />
  );

  return slotName ? arcad : fallbackAd;
};

ArcAd.propTypes = {
  customFields: PropTypes.shape({
    slot: PropTypes.oneOf(['HP01', 'MP01', 'RP01']).tag({
      label: 'Slot ID',
      description: 'Choose a Slot ID for your AD',
    }),
  }),
  staticSlot: PropTypes.string,
};

ArcAd.defaultProps = {
  componentName: 'ArcAd',
};

export default ArcAd;
