import { useAppContext } from 'fusion:context';
import { useContent } from 'fusion:content';
import getProperties from 'fusion:properties';
import fetchEnv from '../../utils/environment.js';

const getPaywallStatus = () => {
  const appContext = useAppContext();
  const { arcSite, globalContent } = appContext;
  const currentEnv = fetchEnv();
  const { sophi } = getProperties(arcSite) || {};
  const { enableSophiPaywall } = sophi[currentEnv] || {};
  const {
    _id: uuid,
    subtype,
    content_restrictions: contentRestrictions,
    label,
  } = globalContent || {};
  const { content_code: contentPaywallStatus } = contentRestrictions || {};
  const { sophi_paywall: sophiPaywall } = label || {};
  let paywallStatus = contentPaywallStatus || 'free';

  if (enableSophiPaywall && subtype && uuid) {
    if (sophiPaywall?.text) {
      // if the label already exists, we use it and avoid the API call
      paywallStatus = sophiPaywall.text;
    } else {
      // otherwise, we make a call to sophi's paywall endpoint for this story, to get the paywall status
      const sophiPaywallStatusMap = {
        METERED: 'premium',
        PAYWALL: 'subscriberonly',
        NOWALL: 'free',
      };
      const sophiStatus = useContent({
        source: 'sophi-paywall',
        query: {
          ids: uuid,
        },
      }) || '';
      paywallStatus = sophiPaywallStatusMap[sophiStatus] || 'free';
    }
  }
  return paywallStatus;
};

export default getPaywallStatus;
