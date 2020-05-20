import { CONTENT_BASE, ARC_ACCESS_TOKEN } from 'fusion:environment';
import axios from 'axios';

export default (arcSite, id, size = 20, from = 0) => {
  if (!arcSite || !id) {
    return null;
  }

  const sizeInt = parseInt(size, 10);
  const fromInt = parseInt(from, 10);

  const promiseArray = [];
  const contentElements = [];

  const numberOfFetches = (fromInt + sizeInt) < 20 ? 1 : Math.ceil((fromInt + sizeInt) / 20);
  let start = 0;
  let i = 1;

  while (i <= numberOfFetches && i < 10) {
    let requestUri = `${CONTENT_BASE}/content/v4/collections/?website=${arcSite}`;
    requestUri += `&_id=${id}`;
    requestUri += `&from=${start}`;
    requestUri += '&size=20';

    const promise = axios
      .get(requestUri, {
        headers: {
          Authorization: `Bearer ${ARC_ACCESS_TOKEN}`,
        },
      })
      .then(({ data }) => contentElements.push(...data.content_elements));

    promiseArray.push(promise);

    start += sizeInt;
    i += 1;
  }

  return Promise.all(promiseArray).then(() => contentElements);
};
