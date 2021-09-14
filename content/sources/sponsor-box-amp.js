import { CONTENT_BASE, ARC_ACCESS_TOKEN } from 'fusion:environment';
import axios from 'axios';
import buildBodyFromQuery from './helper_functions/buildBodyFromQuery';
import getQueryData from './helper_functions/getQueryData';
import getSponsorContent from '../../components/_helper_components/article/sponsorRelatedBox/_helper_functions/getSponserContent';

const params = {
  type: 'text',
  hierarchy: 'text',
  section: 'text',
};

const fetch = async (query) => {
  const {
    section,
    type,
    hierarchy,
    arcSite = 'ajc',
  } = query;

  const endpoint = `${CONTENT_BASE}/site/v3/${type}/${arcSite}/?hierarchy=${hierarchy}`;
  const requestUri = section ? `${endpoint}&_id=${section}` : endpoint;

  let sponsorSectionData;
  let queryData;
  let boxContent;
  let outerSponsorData;

  try {
    sponsorSectionData = await axios.get(requestUri, {
      headers: {
        Authorization: `Bearer ${ARC_ACCESS_TOKEN}`,
      },
    });

    const { data: spData = {} } = sponsorSectionData || {};
    const { Sponsor = {} } = spData;

    outerSponsorData = { ...Sponsor };

    const bodyQuery = {
      daysBack: 1000,
      from: 1,
      size: 10,
      includeTags: `${Sponsor.sponsor_related_box_include_tags || ''}`,
      mustIncludeAllTags: `${Sponsor.sponsor_related_box_must_include_all_tags || ''}`,
      excludeTags: `${Sponsor.sponsor_related_box_exclude_tags || ''}`,
      arcSite,
      useFetch: false,
    };

    const newBody = buildBodyFromQuery(bodyQuery);

    queryData = await getQueryData(arcSite, newBody, bodyQuery.from, bodyQuery.size, bodyQuery.useFetch);
    boxContent = getSponsorContent(5, queryData, { ...Sponsor }, query.uuid);
  } catch (e) {
    console.log('sponsor-box-amp error: ', e);
  }

  return {
    contentElements: boxContent || [],
    sectionConfig: outerSponsorData || {},
  };
};

export default {
  fetch,
  params,
};
