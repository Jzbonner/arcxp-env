import React from 'react';
import PropTypes from 'prop-types';
import getProperties from 'fusion:properties';
import AdSetup from './src/index';
import { adTypes } from './children/adtypes.jsx';
import { NoDFPIdSupplied, PlaceholderAd } from './children/error_components.jsx';

const ArcAd = ({ isAdmin, customFields }) => {
  const { display, slot, type } = customFields;
  const { dfp_id: dfpid } = getProperties();
  console.log('DFPID ', dfpid);

  // If there is no DFP ID and we are in the Admin,
  if (!dfpid && isAdmin) return <NoDFPIdSupplied />;

  // If no DFP ad is supplied and we are not in the admin, render nothing.
  if (!dfpid && !isAdmin) return null;
  // get the data for this particular ad type
  const adType = type ? adTypes.filter(ad => ad.name === type)[0] : {};

  // what to display if there is no ad
  const fallbackAd = null;

  // use their slotname if given, otherwise default to the slotname for this ad type
  const slotName = slot || adType.slotName;

  if (isAdmin) {
    return <PlaceholderAd adInfo={adType} classes={type} slot={slot} />;
  }

  const arcad = (
    <AdSetup
      adType={type}
      //   breakpoints={adBreakpoints}
      childrenPosition="top"
      className={`arc_ad | ${type}`}
      dimensions={adType.dimensions}
      display={display}
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
  }),
  isAdmin: PropTypes.bool,
  isAmp: PropTypes.bool,
  siteProperties: PropTypes.shape({
    dfp_id: PropTypes.string,
    adBreakpoints: PropTypes.string,
  }),
};

export default ArcAd;
