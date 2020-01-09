import React from 'react';
import PropTypes from 'fusion:prop-types';
import AdSetup from './src/index';
import { adTypes, adTypeOptions, defaultAdType } from './children/adtypes.jsx';
import { NoDFPIdSupplied, PlaceholderAd } from './children/error_components.jsx';

const ArcAd = (props) => {
  const { siteProperties, isAdmin } = props;
  const { dfp_id: dfpid, adBreakpoints } = siteProperties;
  const { display, slot, type } = this.props.customFields;

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
      breakpoints={adBreakpoints}
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
    slot: PropTypes.string.tag({
      defaultValue: defaultAdType.slotName || '',
    }),
    display: PropTypes.oneOf(['mobile', 'desktop', 'all']).tag({
      defaultValue: 'all',
    }),
    type: PropTypes.oneOf(adTypeOptions(adTypes)).tag({
      defaultValue: defaultAdType.name,
    }),
  }),
  isAdmin: PropTypes.bool,
  isAmp: PropTypes.bool,
  siteProperties: PropTypes.shape({
    dfp_id: PropTypes.string,
    adBreakpoints: PropTypes.string,
  }),
};

export default ArcAd;
