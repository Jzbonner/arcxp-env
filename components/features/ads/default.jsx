import React from 'react';
import PropTypes from 'prop-types';
import getProperties from 'fusion:properties';
import AdSetup from './src/index';
import { adTypes, adTypeOptions, defaultAdType } from './children/adtypes.jsx';

const ArcAd = ({ customFields }) => {
  const { slot, type } = customFields;
  const { dfp_id: dfpid } = getProperties();
  //   console.log('DFPID ', dfpid);

  // If there is no DFP ID and we are in the Admin,
  if (!dfpid) return null;

  // get the data for this particular ad type
  const adType = type ? adTypes.filter(ad => ad.name === type)[0] : {};

  //   console.log('TYPE ', type);
  //   console.log('SLOT ', slot);

  // what to display if there is no ad
  const fallbackAd = null;

  // use their slotname if given, otherwise default to the slotname for this ad type
  const slotName = slot || adType.slotName;

  const arcad = (
    <AdSetup
      adType={type}
      //   breakpoints={adBreakpoints}
      className={`arc_ad | ${type}`}
      dimensions={adType.dimensions}
      dfpId={dfpid}
      id={slotName}
      slotName={slotName}
      targeting={adType.targeting}
    />
  );

  return slotName ? arcad : fallbackAd;
};

ArcAd.propTypes = {
  customFields: PropTypes.shape({
    slot: PropTypes.oneOf(['HP01', 'RP09', 'PX01']).tag({
      label: 'Slot ID',
      description: 'Choose a Slot ID for your AD',
    }).isRequired,
    type: PropTypes.oneOf(adTypeOptions(adTypes)).tag({
      defaultValue: defaultAdType.name,
    }),
  }),
  siteProperties: PropTypes.shape({
    dfp_id: PropTypes.string,
    // adBreakpoints: PropTypes.string,
  }),
};

export default ArcAd;
