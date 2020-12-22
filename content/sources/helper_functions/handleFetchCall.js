/* eslint-disable no-console */
import { CONTENT_BASE, ARC_ACCESS_TOKEN } from 'fusion:environment';
import getSponsorContent from '../../../components/_helper_components/article/sponsorRelatedBox/_helper_functions/getSponserContent';

// eslint-disable-next-line import/no-named-default
import { default as queryFeedFetch } from '../query-feed';

const buildAMPSponsorBox = async (query) => {
  const arcSite = (query && query.arcSite) || 'ajc';
  const endpoint = `${CONTENT_BASE}/site/v3/${query.type}/${query.arcSite}/?hierarchy=${query.hierarchy}`;

  console.log('API QUERY', query);

  const requestUri = query.section ? `${endpoint}&_id=${query.section}` : endpoint;

  const promiseArray = [];

  let contentElements = null;

  let sectionConfigOuter = null;

  await fetch(requestUri, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${ARC_ACCESS_TOKEN}`,
    },
  }).then(response => response.json())
    .then((data) => {
      console.log('site api data', data);
      const { Sponsor = {} } = data || {};

      const sectionConfig = { ...Sponsor };

      sectionConfigOuter = { ...sectionConfig };

      console.log('section config', sectionConfig);
      console.log('sectionOUTER', sectionConfigOuter);

      console.log('THEN Sponsor', Sponsor);

      return sectionConfig;
    }).then(async (sectionData) => {
      console.log('section data', sectionConfigOuter);
      console.log('sectionDTATATAT', sectionData.sponsor_related_box_include_tags);

      const feedPromise = await queryFeedFetch.fetch({
        from: 1,
        size: 10,
        includeTags: `${sectionData.sponsor_related_box_include_tags || ''}`,
        mustIncludeAllTags: `${sectionData.sponsor_related_box_must_include_all_tags || ''}`,
        excludeTags: `${sectionData.sponsor_related_box_exclude_tags || ''}`,
        arcSite,
        useFetch: true,
      })
        .then((queryFeedData) => {
          console.log('queryFeedData', queryFeedData);
          console.log('sectionOUTER 22222', sectionConfigOuter);
          const boxContent = getSponsorContent(5, queryFeedData, sectionConfigOuter, query.uuid);
          if (!boxContent || (boxContent && boxContent.length < 1)) return null;

          return boxContent;
        }).then((boxContent) => {
          const contentEls = [...boxContent];
          contentElements = [...contentEls];
          console.log('contentElements var', contentElements);
          promiseArray.push(feedPromise);
          return contentEls;
        })
        .catch(err => console.log('error', err));
    });

  return Promise.all(promiseArray).then((data) => {
    console.log('all data', data);
    console.log('promise array', promiseArray);
    console.log('after promise sectionConfig', sectionConfigOuter);
    console.log('after Promise ce', contentElements);

    return (
      {
        contentElements,
        sectionConfig: sectionConfigOuter || null,
      }
    );
  });
};

export default buildAMPSponsorBox;
