/* eslint-disable no-console */
import { CONTENT_BASE, ARC_ACCESS_TOKEN } from 'fusion:environment';
import axios from 'axios';

export default (arcSite, id, size = 20) => {
  if (!arcSite || !id) {
    return null;
  }

  const sizeInt = parseInt(size, 10);
  const fromInt = 0;

  const promiseArray = [];
  const contentElements = [];

  const buffer = Math.ceil(size * 0.1);
  const maxFetchSize = 20;

  let leftToFetch = fromInt + sizeInt + buffer;
  let fetchStart = 0;
  let fetchSize = leftToFetch <= maxFetchSize ? leftToFetch : maxFetchSize;
  let i = 1;

  while (leftToFetch > 0) {
    let requestUri = `${CONTENT_BASE}/content/v4/collections/?website=${arcSite}`;
    requestUri += `&_id=${id}`;
    requestUri += `&from=${fetchStart}`;
    requestUri += `&size=${fetchSize}`;

    const promise = axios
      .get(requestUri, {
        headers: {
          Authorization: `Bearer ${ARC_ACCESS_TOKEN}`,
        },
        id: i,
      })
      .then(({ data, config }) => {
        contentElements.push({ id: config.id, data: data.content_elements });
      })
      .catch((error) => {
        console.log('AXIOS CATCH - getCollectionData => ', error);
      });

    promiseArray.push(promise);

    leftToFetch -= fetchSize;
    fetchStart += fetchSize;
    fetchSize = leftToFetch <= maxFetchSize ? leftToFetch : maxFetchSize;
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
