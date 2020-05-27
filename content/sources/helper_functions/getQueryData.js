import { CONTENT_BASE, ARC_ACCESS_TOKEN } from 'fusion:environment';
import axios from 'axios';

export default (arcSite, newBody, from = 0, size = 100) => {
  if (!arcSite || !newBody) {
    return null;
  }

  const sizeInt = parseInt(size, 10);
  const fromInt = parseInt(from, 10);

  const promiseArray = [];
  const contentElements = [];

  const buffer = 0;
  const fetchSize = 100;
  const numberOfFetches = fromInt + sizeInt + buffer <= fetchSize ? 1 : Math.ceil((fromInt + sizeInt + buffer) / fetchSize);

  let fetchStart = 0;
  let i = 1;

  while (i <= numberOfFetches && i < 10) {
    let requestUri = `${CONTENT_BASE}/content/v4/search/published?body=${newBody}&website=${arcSite}`;
    requestUri += `&from=${fetchStart}`;
    requestUri += `&size=${fetchSize}`;

    const promise = axios
      .get(requestUri, {
        headers: {
          Authorization: `Bearer ${ARC_ACCESS_TOKEN}`,
        },
      })
      .then(({ data }) => {
        contentElements.push(...data.content_elements);
      });

    promiseArray.push(promise);

    fetchStart += fetchSize;
    i += 1;
  }

  return Promise.all(promiseArray).then(() => contentElements);
};
