/* eslint-disable no-console */
const ttl = 120;

const params = {
  id: 'text',
  from: 'text',
  size: 'text',
  arcSite: 'text',
};

const resolve = ({
  id,
  from,
  size,
  arcSite,
}) => `/content/v4/collections/?website=${arcSite}&_id=${id}&from=${from}&size=${size}`;

export default {
  resolve,
  ttl,
  params,
};
