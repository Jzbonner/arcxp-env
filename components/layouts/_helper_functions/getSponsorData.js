import { useContent } from 'fusion:content';
import checkSponsor from './checkSponsor';

export default (sections, onArticlePage = false) => {
  const { sponsorSectionID, sponsorName } = checkSponsor(sections);

  // return null if the sponsor section ID doesn't exist, to prevent unnecessary site-api calls
  if (!sponsorSectionID) return null;

  const siteData = useContent({
    source: 'site-api',
    query: { section: sponsorSectionID || null },
  });

  const {
    Sponsor: {
      disable_advertiser_content_label: disableAd,
      disable_sponsor_related_box: disableSponsorRelatedBox = '',
    } = {},
  } = siteData || {};

  /* for use only on article-basic */
  if (onArticlePage) {
    if (!sponsorSectionID) {
      return {
        sponsorName: null,
        disableSponsorRelatedBox,
      };
    }

    if (disableAd === 'false' || !disableAd) {
      return {
        sponsorName: sponsorName || null,
        disableSponsorRelatedBox,
      };
    }
  }

  if (disableAd === 'false') {
    return sponsorName;
  }

  return null;
};
