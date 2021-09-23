import filterDuplicateStory from './filterDuplicateStory';

export default function getSponserContent(limit, queryFeed, siteData = {}, refId) {
  if (!siteData) return null;
  const { sponsor_url: sponsorUrl, sponsor_related_box_title: sponsorTitle } = siteData;
  if (!queryFeed || queryFeed.length < 1) return null;
  const data = [];
  const filteredQueryFeed = filterDuplicateStory(queryFeed, refId);

  filteredQueryFeed.forEach((el, i) => {
    if (i < limit) {
      if (!el) return null;
      const temp = {};
      temp.sections = el?.taxonomy?.sections;
      if (sponsorTitle && sponsorUrl && i === limit - 1) {
        temp.url = sponsorUrl || null;
        temp.headline = sponsorTitle || null;
      } else if (el.canonical_url && (el.headlines && el.headlines.basic)) {
        temp.url = el.canonical_url;
        temp.headline = el.headlines.basic;
      }

      if (temp.url && temp.headline) return data.push(temp);
    }

    return null;
  });

  return data;
}
