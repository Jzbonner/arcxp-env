import React from 'react';
import PropTypes from 'prop-types';
import getProperties from 'fusion:properties';
import AdSetup from './src/index';
import { adSlots, defaultAdSlot } from './children/adtypes';

const ArcAd = ({ customFields }) => {
  const { slot } = customFields;
  const { dfp_id: dfpid } = getProperties();
  //   console.log('DFPID ', dfpid);

  // If there is no DFP ID and we are in the Admin,
  if (!dfpid) return null;
  //   console.log('SLOT ', slot);

  // what to display if there is no ad
  const fallbackAd = null;

  const adConfig = adSlots.slot || {};

  // if there is no adConfig for the requested ad, abort
  if (!adConfig) {
    console.error(`Ad error: there was no config returned from the adtypes file for ${slot}`);
    return null;
  }

  // use their slotname if given, otherwise default to the slotname for this ad type
  const slotName = slot || adConfig.slotName;

  const arcad = (
    <AdSetup
      adType={slot}
      breakpoints={adConfig.breakpoints || defaultAdSlot.breakpoints}
      className={`arc_ad | ${slot}`}
      dimensions={adConfig.dimensions || defaultAdSlot.dimensions}
      dfpId={dfpid}
      id={adConfig.name || `${defaultAdSlot.name}${slotName}`}
      slotName={slotName}
      targeting={adConfig.targeting || defaultAdSlot.targeting}
    />
  );

  return slotName ? arcad : fallbackAd;
};

ArcAd.propTypes = {
  customFields: PropTypes.shape({
    slot: PropTypes.oneOf(['HP01', 'MP01', 'RP01', 'RP09']).tag({
      label: 'Slot ID',
      description: 'Choose a Slot ID for your AD',
    }).isRequired,
  }),
  siteProperties: PropTypes.shape({
    dfp_id: PropTypes.string,
  }),
};

export default ArcAd;
