import React from 'react';
import PropTypes from 'prop-types';
import getProperties from 'fusion:properties';
import { useAppContext } from 'fusion:context';
import AdSetup from './src/index';
import fetchEnv from '../../_helper_components/global/utils/environment.js';
import { adSlots, defaultAdSlot } from './children/adtypes';
import getContentMeta from '../../_helper_components/global/siteMeta/_helper_functions/getContentMeta';

const ArcAd = ({ customFields, staticSlot }) => {
  const appContext = useAppContext();
  const { isAdmin } = appContext;
  const { slot: customFieldsSlot } = customFields || {};
  const { dfp_id: dfpid, adsPath } = getProperties();
  const slot = customFieldsSlot || staticSlot;
  let randomIdMPG01 = '';
  const currentEnv = fetchEnv();

  // If there is no DFP ID and we are in the Admin,
  if (!dfpid || typeof window === 'undefined') return null;

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

  const contentMeta = getContentMeta();
  const {
    topSection = '',
    environ = '',
    pageContentType,
    site,
    topics = [],
    contentId,
  } = contentMeta || {};

  const globalTargeting = {
    uuid: contentId,
    obj_type: pageContentType,
    environ,
    mediaType: 'Arc',
    sitepath: site.toLowerCase(),
    ad_slot: slotName,
    topics,
  };

  const arcad = (
    <AdSetup
      refresh={true}
      breakpoints={adConfig.breakpoints || defaultAdSlot.breakpoints}
      className={`arc_ad | ${slotName} ${adConfig.isRightRailAd ? 'c-rightRail' : ''} ${adConfig.isSticky ? 'is-sticky' : ''}`}
      dimensions={ adConfig.dimensions || defaultAdSlot.dimensions }
      dfpId={`${dfpid}/${currentEnv !== 'prod' ? 'TEST_' : ''}${adsPath}${topSection}`}
      display={adConfig.display || defaultAdSlot.display}
      id={`${defaultAdSlot.name}${staticSlot || slot}${randomIdMPG01 !== '' ? `-${randomIdMPG01}` : ''}`}
      slotName={slotName}
      targeting={{ ...globalTargeting, ...targeting }}
    />
  );

  if (isAdmin && adConfig.dimensions[0][0] !== 1) {
    return <div style={{
      background: '#efefef',
      fontSize: '30px',
      color: '#000',
      border: '1px solid #000',
      padding: '20px',
      width: 'auto',
    }}>{slotName} placeholder</div>;
  }

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
