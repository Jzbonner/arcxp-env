// This param needs to be declared here so it can be accessed
// by globalContentConfig in the all-staff layout
import fetchAllStaffData from './helper_functions/fetchAllStaffData';

const ttl = 43200;
const params = {
  id: 'text',
};

// const resolve = () => '/author/v1/author-service/';
const resolve = () => fetchAllStaffData();

export default {
  ttl,
  resolve,
  params,
};
