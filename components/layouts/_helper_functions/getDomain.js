import handleSiteName from './handleSiteName';
import fetchEnv from '../../_helper_components/global/utils/environment.js';

export default (layout, cdnSite, cdnOrg, arcSite) => {
  const env = fetchEnv();
  let domain = '';
  if (env === 'prod') {
    domain = `https://${handleSiteName(cdnSite) || handleSiteName(arcSite)}.com`;
  } else if (env !== 'prod') {
    domain = `https://${cdnOrg}-${cdnSite}-${env}.cdn.arcpublishing.com`;
  }
  return domain;
};
