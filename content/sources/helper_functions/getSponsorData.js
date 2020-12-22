/* eslint-disable no-console */
import { CONTENT_BASE, ARC_ACCESS_TOKEN } from 'fusion:environment';
import axios from 'axios';
import checkSponsor from '../../../components/layouts/_helper_functions/checkSponsor';

const getSponsorData = async (sections, query, isSponsorBox = false, sponsorBoxSectionID = '') => {
  const { sponsorSectionID, sponsorName } = checkSponsor(sections);
  const {
    arcSite = 'ajc', type = 'navigation', hierarchy = 'default',
  } = query;

  if (!sponsorSectionID && !isSponsorBox) return null;

  let siteData = null;
  let requestUri = null;

  const endpoint = `${CONTENT_BASE}/site/v3/${type}/${arcSite}/?hierarchy=${hierarchy}`;

  if (sponsorSectionID) {
    requestUri = `${endpoint}&_id=${sponsorSectionID}`;
  } else if (sponsorBoxSectionID) {
    requestUri = `${endpoint}&_id=${sponsorBoxSectionID}`;
  } else {
    requestUri = endpoint;
  }

  const promise = axios
    .get(requestUri, {
      headers: {
        Authorization: `Bearer ${ARC_ACCESS_TOKEN}`,
      },
    })
    .then(({ data }) => {
      siteData = { ...data };
      console.log('data', data);
    })
    .catch((error) => {
      console.log('AXIOS CATCH - getSponsorData => ', error);
    });

  return Promise.all([promise]).then(() => {
    const { Sponsor: { disable_advertiser_content_label: disableAd } = {} } = siteData || {};

    if (!isSponsorBox && disableAd === 'false') {
      return sponsorName;
    }

    if (isSponsorBox) {
      console.log('back site', siteData);
      return siteData;
    }

    return null;
  });
};

export default getSponsorData;
