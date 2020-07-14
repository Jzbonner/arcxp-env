import { CONTENT_BASE, ARC_ACCESS_TOKEN } from 'fusion:environment';
import axios from 'axios';

export default (arcSite, newBody, from = 0, size = 10) => {
  if (!arcSite || !newBody) {
    return null;
  }

  const sizeInt = parseInt(size, 10);
  const fromInt = parseInt(from, 10) - 1;

  const promiseArray = [];
  const contentElements = [];

  const buffer = 5;
  const maxFetchSize = 100;

  const total = fromInt + sizeInt + buffer;

  const numberOfFetches = total <= maxFetchSize ? 1 : Math.ceil(total / maxFetchSize);
  const fetchSize = total <= maxFetchSize ? total : 100;

  let fetchStart = 0;
  let i = 1;

  while (i <= numberOfFetches && i < 10) {
    let requestUri = `${CONTENT_BASE}/content/v4/search/published?body=${newBody}&website=${arcSite}&sort=display_date:desc`;
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
