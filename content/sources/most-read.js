const { CHARTBEAT_API_KEY } = require('../../environment');

const ttl = 36000;

const params = {
  section: 'text',
  host: 'text',
  limit: 'text',
};

const resolve = (query = {}) => {
  const { section, host, limit = '5' } = query;

  let requestUri = 'https://api.chartbeat.com/live/toppages/v3/';
  requestUri += `?apikey=${CHARTBEAT_API_KEY}`;
  requestUri += `&host=${host}`;
  requestUri += section ? `&section=${section}` : '';
  requestUri += `&limit=${limit}`;
  requestUri += '&types=1';
  return requestUri;
};

export default {
  resolve,
  params,
  ttl,
};
