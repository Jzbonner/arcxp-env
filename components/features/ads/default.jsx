import React from 'react';
import PropTypes from 'prop-types';
import getProperties from 'fusion:properties';
import { useAppContext } from 'fusion:context';
import AdSetup from './src/index';
import Zeus from './zeus/default';
import fetchEnv from '../../_helper_components/global/utils/environment.js';
import { adSlots, defaultAdSlot } from './children/adtypes';
import getContentMeta from '../../_helper_components/global/siteMeta/_helper_functions/getContentMeta';
import currentConditions from '../../_helper_components/global/utils/weather/currentConditions';
import './default.scss';

const ArcAd = ({
  customFields,
  adSuffix = '',
  staticSlot,
  galleryTopics = [],
  lazyLoad = false,
  customId = '',
}) => {
  const { temp, text: sky, precipitation: weather } = currentConditions() || {};
  const appContext = useAppContext();
  const { isAdmin, arcSite, outputType } = appContext;

  const { slot: customFieldsSlot, lazy: lazyLoadedFromPb } = customFields || {};
  // when setting ads as lazy loaded from pagebuilder, we apply a random suffix to ensure no duplicate div id's
  const pbAdSuffix = lazyLoadedFromPb ? `-${Math.floor(Math.random() * 100000)}` : '';
  const currentEnv = fetchEnv();
  const {
    dfp_id: dfpid,
    adsPath,
    siteName,
    ads: adsProps,
  } = getProperties(arcSite);
  const { adsBidding } = adsProps[currentEnv] || {};
  const { adsPrebidSlots } = adsBidding || {};

  let staticSlotFormatted = null;
  if (staticSlot) {
    staticSlotFormatted = staticSlot.replace(/ /g, '-').replace(/[()]/g, '');
  }
  const slot = customFieldsSlot || staticSlot;
  // let randomIdMPG01 = '';
  let finalTopics = [];

  // If there is no DFP ID and we are in the Admin,
  if (!dfpid || (!isAdmin && typeof window === 'undefined')) return null;

  // what to display if there is no ad
  const fallbackAd = null;

  const adConfig = adSlots[slot] || null;

  // if there is no adConfig for the requested ad, abort
  if (!adConfig) {
    return null;
  }

  // use their slotname if given, otherwise default to the slot for this ad type
  const slotName = adConfig.slotName || slot;
  const slotBiddingName = adConfig.biddingName || adConfig.slotName || slot;

  const targeting = adConfig.targeting || defaultAdSlot.targeting || {};

  // if Zeus, abort & load the zeus package instead
  if (outputType === 'zeus') return <Zeus slotName={slotName} galleryTopics={galleryTopics} />;

  // get global targeting values

  const contentMeta = getContentMeta();
  const {
    url,
    topSection = '',
    environ = '',
    pageContentType,
    isWrap,
    site,
    topics = [],
    contentId,
    treatPbPageAsArticle,
  } = contentMeta || {};
  const dfpIdFormatted = `${dfpid}/${currentEnv !== 'prod' ? 'TEST_' : ''}${adsPath}`;
  let adSlotNameForArcAds = url === '/homepage' || url === '/' ? 'home' : topSection.replace(/-/g, '_');
  if (adSlotNameForArcAds.indexOf('/') === 0) {
    // we remove the leading `/` if it exists, since the ArcAds lib will add it back in
    adSlotNameForArcAds = adSlotNameForArcAds.substring(1);
  }
  if (adSlotNameForArcAds.substring(adSlotNameForArcAds.length - 1) === '/') {
    // we remove the trailing `/` if it exists, because it will mess up GAM targeting if it exists
    adSlotNameForArcAds = adSlotNameForArcAds.substring(0, adSlotNameForArcAds.length - 1);
  }
  if (adSlotNameForArcAds.indexOf('?') > -1) {
    // we remove the query string (if present), because it will mess up GAM targeting if it's passed in the slot name
    adSlotNameForArcAds = adSlotNameForArcAds.substring(0, adSlotNameForArcAds.indexOf('?'));
  }
  adSlotNameForArcAds = adSlotNameForArcAds.replace(/[@.%20 ]/g, '');

  if (galleryTopics && galleryTopics.length && galleryTopics.length > 0) {
    finalTopics = galleryTopics;
  } else {
    finalTopics = topics;
  }

  // rewrite content types for ads reporting purposes (see APD-520)
  let objType;
  switch (pageContentType) {
    case 'article':
    case 'wire':
    case 'story':
      objType = 'story';
      break;
    case 'blog':
      objType = 'BlogEntry';
      break;
    case 'video':
      objType = 'VideoProxy';
      break;
    case 'instant article':
      objType = ' story_amp';
      break;
    case 'section front':
      objType = 'SectionPage';
      break;
    default:
      objType = pageContentType;
  }

  if (treatPbPageAsArticle) objType = 'specialpresentation';

  const globalTargeting = {
    uuid: contentId,
    obj_type: objType,
    environ,
    mediaType: 'Arc',
    sitepath: site ? site.toLowerCase() : siteName.toLowerCase(),
    ad_slot: slotName,
    topics: finalTopics,
    temp,
    weather,
    sky,
    slotName: `/${dfpIdFormatted}/${adSlotNameForArcAds}`,
  };
  if (isWrap && typeof window.location !== 'undefined') {
    // we set these dynamic values for Wraps
    globalTargeting.wrap_token = window.location.pathname.split('/');
    globalTargeting.wrap_url = window.location.hostname;
  }
  if (arcSite === 'ajc') {
    globalTargeting.zeus = 'notapplied';
  }

  if (isAdmin && adConfig.dimensions[0][0] !== 1) {
    return <div className={`arc_ad ${slotName}`} style={{
      background: '#efefef',
      fontSize: '30px',
      color: '#000',
      border: '1px solid #000',
      padding: '20px',
      width: 'auto',
    }}>{slotName} placeholder</div>;
  }

  const arcad = (
    <AdSetup
      refresh={false}
      breakpoints={adConfig.breakpoints || defaultAdSlot.breakpoints}
      className={`arc_ad | ${slotName} b-margin-bottom-d30-m20
       ${adConfig.isSticky ? 'is-sticky' : ''}`}
      dimensions={adConfig.dimensions || defaultAdSlot.dimensions}
      dfpId={dfpIdFormatted}
      display={adConfig.display || defaultAdSlot.display}
      id={`${customId}` || `${defaultAdSlot.name}${staticSlotFormatted || slot.replace(/ /g, '-').replace(/[()]/g, '')}${adSuffix || pbAdSuffix}`}
      slotName={slotName}
      adSlotNameForArcAds={adSlotNameForArcAds}
      targeting={{ ...globalTargeting, ...targeting }}
      bidding={adsPrebidSlots[slotBiddingName] || { prebid: false, amazon: false }}
      lazyLoad={lazyLoad || lazyLoadedFromPb}
    />
  );

  if (slotName === 'HS02' || slotName === 'WCC01') {
    return (
      <>
        <div className={`c-${slotName}`}>{arcad}</div>
      </>
    );
  }

  return slotName ? arcad : fallbackAd;
};

ArcAd.propTypes = {
  customFields: PropTypes.shape({
    slot: PropTypes.oneOf([
      'HP00',
      'HP01',
      'HP02',
      'HP03',
      'HP04',
      'HP05',
      'HS02',
      'MP01',
      'MP02',
      'MP03',
      'MP04',
      'MP05',
      'RP01',
      'RP01 desktop',
      'RP01 tablet',
      'RP01 300x250',
      'RP01 300x250 (desktop only)',
      'RP01 300x600',
      'RP01 300x600 (desktop only)',
      'RP01 sticky',
      'RP01 sticky (desktop only)',
      'RP02',
      'RP03 sticky',
      'RP03 sticky (desktop only)',
      'RP03 tablet',
      'RP09 300x250',
      'RP09 300x250 (desktop only)',
      'RP09 sticky',
      'RP09 sticky (desktop only)',
      'RP09 tablet',
      'SP01',
    ]).tag({
      name: 'Slot ID',
      description: 'Select the ad slot to be inserted',
      value: '',
    }),
    lazy: PropTypes.bool.tag({
      label: 'Lazy load',
      description: 'Check this box to mark this slot as lazy load-able (i.e. can render below the paygate).',
      value: '',
    }),
  }),
  staticSlot: PropTypes.string,
  galleryTopics: PropTypes.array,
  lazyLoad: PropTypes.bool,
  adSuffix: PropTypes.string,
  customId: PropTypes.string,
};

ArcAd.defaultProps = {
  componentName: 'ArcAd',
};

export default ArcAd;
