import React from 'react';
import PropTypes from 'prop-types';
import { useAppContext } from 'fusion:context';
import getProperties from 'fusion:properties';
import fetchEnv from '../../_helper_components/global/utils/environment.js';
import AdSetup from './src/index';
import checkPageType from '../../layouts/_helper_functions/getPageType.js';
import { adSlots, defaultAdSlot } from './children/adtypes';

const ArcAd = ({ customFields, staticSlot }) => {
  const appContext = useAppContext();
  const { globalContent, layout, requestUri } = appContext;
  const {
    _id: uuid,
    subtype,
    type,
    taxonomy,
  } = globalContent || {};
  const { tags = [] } = taxonomy || {};
  const targetingTopics = [];
  tags.forEach((tag) => {
    if (tag && tag.text) {
      targetingTopics.push(tag.text);
    }
  });
  const { slot: customFieldsSlot } = customFields || {};
  const { dfp_id: dfpid, siteName } = getProperties();
  const slot = customFieldsSlot || staticSlot;
  let randomIdMPG01 = '';
  const currentEnv = fetchEnv();
  const pageType = checkPageType(subtype || type, layout);
  const {
    isHome,
    isSection,
    type: typeOfPage,
  } = pageType || {};
  let contentType = typeOfPage === 'story' ? 'article' : typeOfPage.toLowerCase();
  if (isHome) {
    contentType = 'homepage';
  } else if (isSection) {
    contentType = 'sectionPage';
  }

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

  if (staticSlot && staticSlot.includes('MPG01')) randomIdMPG01 = Math.floor(Math.random() * 999999);
  // define global targeting values
  const globalTargeting = {
    obj_type: contentType,
    environ: currentEnv.toLowerCase(),
    mediaType: 'Arc',
    sitepath: siteName.toLowerCase(),
    ad_slot: slotName,
    topics: targetingTopics,
  };

  const arcad = (
    <AdSetup
      refresh={true}
      breakpoints={adConfig.breakpoints || defaultAdSlot.breakpoints}
      className={`arc_ad | ${slotName} ${adConfig.isRightRailAd ? 'c-rightRail' : ''} ${adConfig.isSticky ? 'is-sticky' : ''}`}
      dimensions={ adConfig.dimensions || defaultAdSlot.dimensions }
      dfpId={`${dfpid}/${currentEnv.toLowerCase().indexOf('prod') === -1 ? 'TEST_' : ''}atlanta_np/ajc_web_default`}
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
