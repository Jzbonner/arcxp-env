import { useAppContext } from 'fusion:context';
import { useContent } from 'fusion:content';
import getProperties from 'fusion:properties';

const getPaywallStatus = () => {
  const appContext = useAppContext();
  const { arcSite, globalContent } = appContext;
  const { enableSophiPaywall } = getProperties(arcSite) || {};
  const {
    _id: uuid,
    subtype,
    content_restrictions: contentRestrictions,
    label,
    taxonomy,
  } = globalContent || {};
  const { content_code: contentPaywallStatus } = contentRestrictions || {};
  const { sophi_paywall: sophiPaywall } = label || {};
  const { tags = [] } = taxonomy || {};
  const alwaysTreatAsFreeTags = ['newsroom-free', 'reportforamerica', 'urgent-weather', 'rct-content', 'philanthropic-ajc', 'presson'];
  const alwaysTreatAsFree = tags.some(tag => alwaysTreatAsFreeTags.includes(tag));

  let paywallStatus = contentPaywallStatus || 'free';
  if (alwaysTreatAsFree) {
    paywallStatus = 'free';
  } else if (enableSophiPaywall && subtype && uuid) {
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
