/* eslint-disable no-console */
import { CONTENT_BASE, ARC_ACCESS_TOKEN } from 'fusion:environment';
import axios from 'axios';
import checkSponsor from '../../../components/layouts/_helper_functions/checkSponsor';

const getSponsorData = (sections, query) => {
  const { sponsorSectionID, sponsorName } = checkSponsor(sections);
  const {
    arcSite = 'ajc', type = 'navigation', hierarchy = 'default',
  } = query;

  if (typeof window === 'undefined' || !sponsorSectionID) return null;

  let siteData = null;

  const endpoint = `${CONTENT_BASE}/site/v3/${type}/${arcSite}/?hierarchy=${hierarchy}`;

  const requestUri = sponsorSectionID ? `${endpoint}&_id=${sponsorSectionID}` : endpoint;

  const promise = axios
    .get(requestUri, {
      headers: {
        Authorization: `Bearer ${ARC_ACCESS_TOKEN}`,
      },
    })
    .then(({ data }) => {
      siteData = { ...data };
    })
    .catch((error) => {
      console.log('AXIOS CATCH - getSponsorData => ', error);
    });

  return Promise.all([promise]).then(() => {
    const { Sponsor: { disable_advertiser_content_label: disableAd } = {} } = siteData || {};

    if (disableAd === 'false') {
      return sponsorName;
    }
    return null;
  });
};

export default getSponsorData;
