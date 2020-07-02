/* eslint-disable no-console */
import { CONTENT_BASE, ARC_ACCESS_TOKEN } from 'fusion:environment';
import axios from 'axios';
import checkSponsor from '../../../components/layouts/_helper_functions/checkSponsor';

const getSponsorData = (sections, query) => {
  const { sponsorSectionID /* sponsorName */ } = checkSponsor(sections);
  const {
    arcSite = 'ajc', type = 'navigation', hierarchy = 'default',
  } = query;

  if (!sponsorSectionID) return null;

  console.log('content_base', CONTENT_BASE);
  console.log('access token', ARC_ACCESS_TOKEN);

  const endpoint = `${CONTENT_BASE}/site/v3/${type}/${arcSite}/?hierarchy=${hierarchy}`;

  const requestUri = sponsorSectionID ? `${endpoint}&_id=${sponsorSectionID}` : endpoint;

  const promise = axios
    .get(requestUri, {
      headers: {
        Authorization: `Bearer ${ARC_ACCESS_TOKEN}`,
      },
    })
    .then(({ data }) => {
      console.log('returned data', data);
    });

  console.log('promise', promise);

  // const { Sponsor: { disable_advertiser_content_label: disableAd } = {} } = siteData || {};

  /* if (disableAd === 'false') {
    return sponsorName;
  } */

  return null;
};

export default getSponsorData;
