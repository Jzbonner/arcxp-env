/* eslint-disable no-console */
import { CONTENT_BASE, ARC_ACCESS_TOKEN } from 'fusion:environment';
import axios from 'axios';

export default (arcSite, id, size = 20, from = 0) => {
  if (!arcSite || !id) {
    return null;
  }

  const sizeInt = parseInt(size, 10);

  const promiseArray = [];
  const contentElements = [];

  const buffer = 3;
  const fetchSize = 20;
  const numberOfFetches = from + sizeInt + buffer <= fetchSize ? 1 : Math.ceil((from + sizeInt + buffer) / fetchSize);

  let fetchStart = from;
  let i = 1;

  while (i <= numberOfFetches && i < 10) {
    let requestUri = `${CONTENT_BASE}/content/v4/collections/?website=${arcSite}`;
    requestUri += `&_id=${id}`;
    requestUri += `&from=${fetchStart}`;
    requestUri += '&size=20';

    const promise = axios
      .get(requestUri, {
        headers: {
          Authorization: `Bearer ${ARC_ACCESS_TOKEN}`,
        },
        id: i,
      })
      .then(({ data, config }) => {
        const filterData = data.content_elements.filter(story => story.publish_date);
        contentElements.push({ id: config.id, data: filterData });
      })
      .catch((error) => {
        console.log('AXIOS CATCH - getCollectionData => ', error);
      });

    promiseArray.push(promise);

    fetchStart += fetchSize;
    i += 1;
  }

  return Promise.all(promiseArray).then(() => {
    let sortedContentElements = [];
    contentElements
      .sort((a, b) => a.id - b.id)
      .forEach((content) => {
        sortedContentElements = [...sortedContentElements, ...content.data];
      });
    return sortedContentElements;
  });
};
