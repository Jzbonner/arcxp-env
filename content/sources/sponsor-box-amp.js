/* eslint-disable no-console */
import handleFetchCall from './helper_functions/handleFetchCall';

const params = {
  type: 'text',
  hierarchy: 'text',
  section: 'text',
};

const fetch = query => handleFetchCall(query);

export default {
  fetch,
  params,
};
