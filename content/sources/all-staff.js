// This param needs to be declared here so that it
// can be accessed in the all-staff layout by globalContentConfig.
const params = {
  id: 'text',
};

const resolve = () => '/author/v1/author-service/';

export default {
  resolve,
  params,
};
