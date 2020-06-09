// This param needs to be declared here so it can be accessed
// by globalContentConfig in the all-staff layout

const params = {
  id: 'text',
};

const resolve = () => '/author/v1/author-service/';

export default {
  resolve,
  params,
};
