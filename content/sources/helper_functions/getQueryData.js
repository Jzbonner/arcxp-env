import { CONTENT_BASE, ARC_ACCESS_TOKEN } from 'fusion:environment';
import axios from 'axios';

export default (arcSite, newBody, size = 100) => {
  if (!arcSite || !newBody) {
    return null;
  }

  const sizeInt = parseInt(size, 10);
  const fromInt = 0;

  const promiseArray = [];
  const contentElements = [];

  const buffer = 0;
  const fetchSize = 100;
  const numberOfFetches = fromInt + sizeInt + buffer <= fetchSize ? 1 : Math.ceil((fromInt + sizeInt + buffer) / fetchSize);

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
