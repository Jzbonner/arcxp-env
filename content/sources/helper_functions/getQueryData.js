/* eslint-disable no-console */
import { CONTENT_BASE, ARC_ACCESS_TOKEN } from 'fusion:environment';
import axios from 'axios';
import filter from '../../filters/queryFilter';

export default (arcSite, newBody, from = 0, size = 10, useFetch = false) => {
  if (!arcSite || !newBody) {
    return null;
  }

  const sizeInt = parseInt(size, 10);
  // if the `from` value is greater than 1, we subtract 1 from it for the official start index
  // this is because the query results are 0-indexed but what producers enter (and think) are 1-indexed values
  const fromInt = parseInt(from, 10) > 0 ? parseInt(from, 10) - 1 : 0;

  const promiseArray = [];
  const contentElements = [];

  const buffer = 5;
  const maxFetchSize = 100;
  let promise = null;

  const total = fromInt + sizeInt + buffer;
  let leftToFetch = total;

  const numberOfFetches = total <= maxFetchSize ? 1 : Math.ceil(total / maxFetchSize);

  let fetchStart = fromInt;
  let i = 1;

  while (i <= numberOfFetches && i < 10) {
    const fetchSize = leftToFetch <= maxFetchSize ? leftToFetch : maxFetchSize;
    const encodedFilter = encodeURIComponent(filter.replace(/\s+/g, ''));

    let requestUri = `${CONTENT_BASE}/content/v4/search/published?body=${newBody}&website=${arcSite}&sort=display_date:desc`;
    requestUri += `&from=${fetchStart}`;
    requestUri += `&size=${fetchSize}`;
    requestUri += `&_sourceInclude=${encodedFilter}`;

    if (useFetch) {
      promise = fetch(requestUri, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${ARC_ACCESS_TOKEN}`,
        },
      }).then(response => response.json())
        .then((data) => {
          contentElements.push({ data: data.content_elements });
        })
        .catch((error) => {
          console.log('FETCH API CATCH - getQueryData => ', error);
        });
    } else {
      promise = axios
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
          console.log('AXIOS CATCH - getQueryData => ', error);
        });
    }

    promiseArray.push(promise);

    fetchStart += fetchSize;
    leftToFetch -= fetchSize;
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
