import { useContent } from 'fusion:content';
import checkSponsor from './checkSponsor';

export default (sections) => {
  const { sponsorSectionID, sponsorName } = checkSponsor(sections);

  if (sponsorSectionID === null) return null;

  const siteData = useContent({
    source: 'site-api',
    query: { section: sponsorSectionID || null },
  });

  const { Sponsor: { disable_advertiser_content_label: disableAd } = {} } = siteData || {};

  if (disableAd === 'false') {
    return sponsorName;
  }

  return null;
};
